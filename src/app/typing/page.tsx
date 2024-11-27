"use client";

import { useState } from "react";

import { Sidebar } from "@/components/root/sidebar";
import { Gameplay } from "@/components/root/gameplay";
import { BottomBar } from "@/components/root/bottomBar";
import { FreeTyping } from "@/components/root/freeTyping";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ApplicationMode = "" | "freeTyping" | "gameplay";
export default function TypingPage() {
  const [selectedMode, setSelectedMode] = useState<ApplicationMode>("");

  return (
    <main className="flex flex-wrap gap-4 p-4">
      <div className="w-full md:w-3/12">
        <Sidebar />
      </div>

      <div className="w-full md:w-6/12 p-4">
        {!selectedMode ? (
          <div className="flex flex-col items-center justify-center border-2 rounded-sm">
            <h1 className="text-2xl font-semibold">Braille Typing Excercise</h1>
            <Image src="/images/perkins_brailler.png" alt="Braille Typing" width={600} height={400} />
            <div className="space-x-2 mb-2">
              <Button className="text-xl" variant="secondary" onClick={() => setSelectedMode("freeTyping")}>
                Free Typing
              </Button>
              <Button className="text-xl" variant="secondary" onClick={() => setSelectedMode("gameplay")}>
                Start Game
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-w-[800px] min-h-[600px]">
            {selectedMode === "freeTyping" && <FreeTyping onBack={() => setSelectedMode("")} />}
            {selectedMode === "gameplay" && <Gameplay onBack={() => setSelectedMode("")} />}
          </div>
        )}
      </div>

      <div className="w-full md:w-3/12 bg-purple-100">{""}</div>
    </main>
  );
}
