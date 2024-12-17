import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { CiTimer } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FaCheck, FaForward, FaTrophy } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { keyToDotMap } from "@/lib/constants";
import { WordList } from "@/contents/en/wordList";
import { BrailleMappings, BrailleUnicode } from "@/contents/en/customBrailleData";
import { speakText } from "@/utils/audioUtils";

type GameState = "countdown" | "gameplay" | "gameover";

interface PlayerData {
  points: number;
  skipped: number;
  correct: number;
  incorrect: number;
}

interface GameplayData {
  countdown: number;
  progressBar: number;
  timer: number;
  maxGameTimer: number;
}

type TextToSpeechOptions = "Google US English" | "Google 日本語";
type displayIntervalOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type gameLengthOptions = 1 | 2 | 3 | 4 | 5;
type practiceTopicOptions = "Alphabet" | "Number" | "Capital Letters" | "Capital Word" | "Capital Passage";
type soundEffectsOptions = "None" | "Quiz" | "Cyber";

interface GameplaySettings {
  audioEnabled: boolean;
  tts: TextToSpeechOptions;
  displayInterval: displayIntervalOptions;
  gameLength: gameLengthOptions;
  practiceTopic: practiceTopicOptions;
  soundEffects: soundEffectsOptions;
}

interface GameAudio {
  clear: HTMLAudioElement;
  skip: HTMLAudioElement;
  correct: HTMLAudioElement;
  incorrect: HTMLAudioElement;
  countdown: HTMLAudioElement;
}

interface CharacterList {
  character: string;
  keystroke: string;
}

interface ActiveCharacter {
  keystroke: string;
  timeToLive: number;
  timestamp: number;
  completed: boolean;
}

export default function Gameplay({ onBack }: { onBack: () => void }) {
  const [gameState, setGameState] = useState<GameState>("countdown");
  const [playerData, setPlayerData] = useState<PlayerData>({ points: 0, skipped: 0, correct: 0, incorrect: 0 });
  const [gameplaySettings, setGameplaySettings] = useState<GameplaySettings>({
    audioEnabled: true,
    tts: "Google US English",
    displayInterval: 1,
    gameLength: 1,
    practiceTopic: "Alphabet",
    soundEffects: "None",
  });
  const [gameplayData, setGameplayData] = useState<GameplayData>({ countdown: 3, progressBar: 100, timer: gameplaySettings.gameLength * 60, maxGameTimer: gameplaySettings.gameLength * 60 });

  const [currentInput, setCurrentInput] = useState<Set<string>>(new Set());
  const [registeredInput, setRegisteredInput] = useState<string[]>(Array(6));

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [highlightedCharacter, setHighlightedCharacter] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [characterList, setCharacterList] = useState<CharacterList[]>([]);

  const [activeCharacters, setActiveCharacters] = useState<ActiveCharacter[]>([]);

  const [gameAudio] = useState<GameAudio>({
    clear: new Audio("/audio/clear.mp3"),
    skip: new Audio("/audio/skip.mp3"),
    correct: new Audio("/audio/correct.mp3"),
    incorrect: new Audio("/audio/incorrect.mp3"),
    countdown: new Audio("/audio/countdown.wav"),
  });

  const [animationCompleted, setAnimationCompleted] = useState<{ [key: number]: boolean }>({});

  // handle initial settings on load
  useEffect(() => {
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    const storedDisplayInterval = localStorage.getItem("displayInterval");
    const storedGameLength = localStorage.getItem("gameLength");
    const storedPracticeTopic = localStorage.getItem("practiceTopic");
    const storedAudioEffect = localStorage.getItem("audioEffect");

    const initialSettings = {
      ...gameplaySettings,
      audioEnabled: storedAudioEnabled ? storedAudioEnabled === "true" : gameplaySettings.audioEnabled,
      displayInterval: storedDisplayInterval ? (parseInt(storedDisplayInterval) as displayIntervalOptions) : gameplaySettings.displayInterval,
      gameLength: storedGameLength ? (parseInt(storedGameLength) as gameLengthOptions) : gameplaySettings.gameLength,
      practiceTopic: storedPracticeTopic ? (storedPracticeTopic as practiceTopicOptions) : gameplaySettings.practiceTopic,
      soundEffects: storedAudioEffect ? (storedAudioEffect as soundEffectsOptions) : gameplaySettings.soundEffects,
    };

    setGameplaySettings(initialSettings);
    setGameplayData((prev) => ({
      ...prev,
      timer: initialSettings.gameLength * 60,
      maxGameTimer: initialSettings.gameLength * 60,
    }));
  }, []);

  // handles user input
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (gameState !== "gameplay") return;
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        setCurrentInput((prev) => new Set([...Array.from(prev), event.key.toLowerCase()]));
        setRegisteredInput((prev) => {
          const dotIndex = keyToDotMap[event.key.toLowerCase()];
          if (dotIndex !== undefined) {
            const newRegisteredInput = [...prev];
            newRegisteredInput[dotIndex] = (dotIndex + 1).toString();
            return newRegisteredInput;
          }
          return prev;
        });
      }
    };

    const handleKeyup = (event: KeyboardEvent): void => {
      if (gameState !== "gameplay") return;
      if (Object.keys(keyToDotMap).includes(event.key.toLowerCase())) {
        const updatedInput = new Set(currentInput);
        updatedInput.delete(event.key.toLowerCase());
        setCurrentInput(updatedInput);

        if (updatedInput.size != 0) return;
        if (!activeCharacters[currentIndex]) return;

        const combinedEncoding = registeredInput.join("");
        setRegisteredInput(Array(6));

        if (combinedEncoding === activeCharacters[currentIndex].keystroke) {
          setActiveCharacters((prev) => {
            const newActiveCharacters = [...prev];
            newActiveCharacters[currentIndex].completed = true;

            const nextIndex = currentIndex + 1;
            if (nextIndex < characterList.length && !newActiveCharacters[nextIndex]) {
              newActiveCharacters[nextIndex] = {
                keystroke: characterList[nextIndex].keystroke,
                timeToLive: 6000,
                timestamp: Date.now(),
                completed: false,
              };
            }

            return newActiveCharacters;
          });

          setCurrentIndex((prev) => prev + 1);
          setHighlightedCharacter((prev) => [...prev, currentIndex]);
          setPlayerData((prev) => ({ ...prev, points: prev.points + 10 }));
          setPlayerData((prev) => ({ ...prev, correct: prev.correct + 1 }));

          if (currentIndex === characterList.length - 1) {
            playSound(gameAudio.clear);
            generateNewWord();
          } else {
            playSound(gameAudio.correct);
            speakText(characterList[currentIndex + 1].character, true, false);
          }
        } else {
          playSound(gameAudio.incorrect);
          setPlayerData((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
          setPlayerData((prev) => ({ ...prev, points: prev.points - 10 }));
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [currentInput, registeredInput, currentIndex, characterList, activeCharacters]);

  // handles intital countdown
  useEffect(() => {
    if (gameState !== "countdown") return;
    if (gameplayData.countdown <= 0) {
      setGameState("gameplay");
      generateNewWord();
      return;
    }

    gameAudio.countdown.currentTime = 1.9;
    if (gameAudio.countdown.paused && !gameAudio.countdown.ended) {
      playSound(gameAudio.countdown);
    }

    const timer = setInterval(() => {
      setGameplayData((prev) => ({ ...prev, countdown: prev.countdown - 1 }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [gameState, gameplayData.countdown]);

  // handles gameplay timer
  useEffect(() => {
    if (true) return;
    if (gameState !== "gameplay") return;
    if (gameplayData.timer <= 0) {
      setGameState("gameover");
      return;
    }

    const timer = setInterval(() => {
      setGameplayData((prev) => ({ ...prev, timer: prev.timer - 1 }));
      setGameplayData((prev) => ({ ...prev, progressBar: (prev.timer / prev.maxGameTimer) * 100 }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [gameState, gameplayData.timer]);

  // handles braille character display
  useEffect(() => {
    if (gameState !== "gameplay") return;
    if (characterList.length === 0) return;

    if (activeCharacters.length === 0) {
      setActiveCharacters([
        {
          keystroke: characterList[0].keystroke,
          timeToLive: 6000,
          timestamp: Date.now(),
          completed: false,
        },
      ]);
      setAnimationCompleted({ 0: false });
      speakText(characterList[0].character, true, true);
    }

    const displayInterval = setInterval(() => {
      setActiveCharacters((current) => {
        if (current.length === 0) return current;
        if (current[current.length - 1]?.completed) return current;

        const nextIndex = current.length;
        if (nextIndex >= characterList.length) return current;

        if (nextIndex === 0) {
          setAnimationCompleted((prev) => ({
            ...prev,
            [nextIndex]: false,
          }));

          return [
            {
              keystroke: characterList[nextIndex].keystroke,
              timeToLive: 6000,
              timestamp: Date.now(),
              completed: false,
            },
          ];
        }

        const lastCharacter = current[current.length - 1];
        const timeSinceLastChar = Date.now() - lastCharacter.timestamp;

        if (timeSinceLastChar < gameplaySettings.displayInterval * 1000 || !animationCompleted[nextIndex - 1]) {
          return current;
        }

        setAnimationCompleted((prev) => ({
          ...prev,
          [nextIndex]: false,
        }));

        return [
          ...current,
          {
            keystroke: characterList[nextIndex].keystroke,
            timeToLive: 6000,
            timestamp: Date.now(),
            completed: false,
          },
        ];
      });
    }, 100);

    return () => {
      clearInterval(displayInterval);
    };
  }, [gameState, selectedWord, characterList, gameplaySettings.displayInterval, animationCompleted]);

  // handles time to live for active characters
  useEffect(() => {
    if (gameState !== "gameplay") return;
    if (activeCharacters.length === 0) return;

    const checkInterval = setInterval(() => {
      const currentTime = Date.now();
      const hasExpiredCharacter = activeCharacters.some((character) => !character.completed && currentTime - character.timestamp >= character.timeToLive);

      if (hasExpiredCharacter) {
        skipWord();
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
    };
  }, [gameState, activeCharacters]);

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function getBrailleUnicode(text: string | null): string {
    if (!text) return "";
    return text.split("").reduce((result, char) => result + BrailleUnicode[BrailleMappings.Alphabet.content[char].keystroke.join("")], "");
  }

  function generateNewWord(): void {
    setHighlightedCharacter([]);
    setActiveCharacters([]);
    setCharacterList([]);
    setCurrentIndex(0);

    const word = WordList[Math.floor(Math.random() * WordList.length)];
    setSelectedWord(word);
    speakText(word, true, true);

    const list = [];
    for (let i = 0; i < word.length; i++) {
      list.push({ character: word[i], keystroke: BrailleMappings.Alphabet.content[word[i]].keystroke.join("") });
    }
    setCharacterList(list);
  }

  function skipWord(): void {
    playSound(gameAudio.skip);
    setPlayerData((prev) => ({ ...prev, points: prev.points - 10 }));
    setPlayerData((prev) => ({ ...prev, skipped: prev.skipped + 1 }));

    generateNewWord();
  }

  function handleRestart(): void {
    const storedAudioEnabled = localStorage.getItem("audioEnabled");
    const storedDisplayInterval = localStorage.getItem("displayInterval");
    const storedGameLength = localStorage.getItem("gameLength");
    const storedPracticeTopic = localStorage.getItem("practiceTopic");
    const storedAudioEffect = localStorage.getItem("audioEffect");

    const updatedSettings = {
      ...gameplaySettings,
      audioEnabled: storedAudioEnabled ? storedAudioEnabled === "true" : gameplaySettings.audioEnabled,
      displayInterval: storedDisplayInterval ? (parseInt(storedDisplayInterval) as displayIntervalOptions) : gameplaySettings.displayInterval,
      gameLength: storedGameLength ? (parseInt(storedGameLength) as gameLengthOptions) : gameplaySettings.gameLength,
      practiceTopic: storedPracticeTopic ? (storedPracticeTopic as practiceTopicOptions) : gameplaySettings.practiceTopic,
      soundEffects: storedAudioEffect ? (storedAudioEffect as soundEffectsOptions) : gameplaySettings.soundEffects,
    };

    setGameplaySettings(updatedSettings);
    setGameState("countdown");
    setPlayerData({ points: 0, skipped: 0, correct: 0, incorrect: 0 });
    setGameplayData({
      countdown: 3,
      progressBar: 100,
      timer: updatedSettings.gameLength * 60,
      maxGameTimer: updatedSettings.gameLength * 60,
    });
  }

  function playSound(audio: HTMLAudioElement) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  function renderBrailleText(): ReactNode {
    if (!selectedWord) return null;

    return (
      <div className="flex gap-2">
        <p>
          {selectedWord.split("").map((char, index) => (
            <span key={index} className={`${highlightedCharacter.includes(index) ? "text-green-500" : "text-slate-800 dark:text-slate-200"}`}>
              {char}
            </span>
          ))}
        </p>

        <p>
          (
          {getBrailleUnicode(selectedWord)
            .split("")
            .map((char, index) => (
              <span key={index} className={`${highlightedCharacter.includes(index) ? "text-green-500" : "text-slate-800 dark:text-slate-200"}`}>
                {char}
              </span>
            ))}
          )
        </p>
      </div>
    );
  }

  function BrailleDot({ active, number }: { active: boolean; number: number }) {
    return (
      <motion.div
        initial={{
          backgroundColor: active ? "rgb(60, 60, 60)" : "rgb(226 232 240)",
        }}
        transition={{ duration: 0.2 }}
        className={cn("w-8 h-8 rounded-full", "border-2 border-slate-300", "flex items-center justify-center")}
      ></motion.div>
    );
  }

  function renderBrailleCharacter(character: ActiveCharacter, index: number) {
    return (
      <div key={`character-${index}`} className="absolute left-1/2 -translate-x-1/2">
        <motion.div initial={{ y: 0 }} animate={{ y: "60vh" }} transition={{ duration: 6, ease: "linear", delay: 0 }} className="flex items-center justify-center">
          <div className="flex flex-col space-x-2">
            <div className="absolute right-[2rem]">
              <motion.div
                initial={{ x: 0, y: "5rem" }}
                animate={{ x: "-5rem", y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                onAnimationComplete={() => {
                  setAnimationCompleted((prev) => ({
                    ...prev,
                    [index]: true,
                  }));
                }}
                className="absolute"
              >
                <BrailleDot number={3} active={character.keystroke.includes("3")} />
              </motion.div>
              <motion.div initial={{ x: 0, y: "2.5rem" }} animate={{ x: "-2.5rem", y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="absolute">
                <BrailleDot number={2} active={character.keystroke.includes("2")} />
              </motion.div>
              <div className="absolute">
                <BrailleDot number={1} active={character.keystroke.includes("1")} />
              </div>
            </div>
            <div className="absolute left-[1rem]">
              <div className="absolute">
                <BrailleDot number={4} active={character.keystroke.includes("4")} />
              </div>
              <motion.div initial={{ x: 0, y: "2.5rem" }} animate={{ x: "2.5rem", y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="absolute">
                <BrailleDot number={5} active={character.keystroke.includes("5")} />
              </motion.div>
              <motion.div initial={{ x: 0, y: "5rem" }} animate={{ x: "5rem", y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} className="absolute">
                <BrailleDot number={6} active={character.keystroke.includes("6")} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {gameState === "countdown" && (
        <div className="flex flex-col items-center border-2 border-slate-200 dark:border-slate-700 rounded-md gap-4 w-full">
          <div className="flex justify-center items-center w-full h-[70vh] bg-slate-100 dark:bg-slate-800">
            <span className="text-8xl font-bold text-slate-800 dark:text-slate-200">{gameplayData.countdown}</span>
          </div>
        </div>
      )}

      {gameState === "gameplay" && (
        <div className="flex flex-col items-center border-2 border-slate-200 dark:border-slate-700 rounded-md gap-4">
          <div className="flex justify-between items-center space-x-2 w-full p-2 bg-slate-200 dark:bg-slate-800">
            <Button className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200" size="sm" onClick={onBack}>
              Back
            </Button>

            <div className="flex justify-center items-center gap-2 p-2 w-1/2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm">
              <CiTimer size="24" className="text-slate-700 dark:text-slate-200" />
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{formatTime(gameplayData.timer)}</p>
              <Progress className="bg-slate-200 dark:bg-slate-600" value={gameplayData.progressBar} />
            </div>

            <p className="flex p-2 rounded-lg bg-slate-50 dark:bg-slate-700 shadow-sm font-medium text-slate-800 dark:text-slate-200">Points: {playerData.points}</p>
          </div>

          <div className="flex justify-center items-center p-4 w-full border-y-2 font-semibold text-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">{renderBrailleText()}</div>

          <div className="items-start justify-center h-[60vh] w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">{activeCharacters.map((character, index) => !character.completed && renderBrailleCharacter(character, index))}</div>
        </div>
      )}

      {gameState === "gameover" && (
        <div className="flex justify-center items-center w-full h-[70vh] bg-slate-200 dark:bg-slate-800 z-50">
          <div className="flex flex-col items-center gap-6 p-8 rounded-lg bg-white dark:bg-slate-800">
            <h2 className="font-bold text-center text-3xl mb-2 dark:text-white">Game Over!</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <FaTrophy className="text-yellow-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Final Score</p>
                  <p className="text-2xl font-bold">{playerData.points}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-green-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Correct</p>
                  <p className="text-2xl font-bold">{playerData.correct}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTimes className="text-red-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Incorrect</p>
                  <p className="text-2xl font-bold">{playerData.incorrect}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaForward className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-sm text-gray-500">Skipped</p>
                  <p className="text-2xl font-bold">{playerData.skipped}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleRestart}>Restart</Button>
              <Button onClick={onBack}>Back to Menu</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
