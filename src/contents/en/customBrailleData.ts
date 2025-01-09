export type BrailleMappingsType = {
  [key: string]: {
    Compatibility: number;
    content: {
      [key: string]: {
        title: string;
        symbol?: string;
        keystroke: string[];
        terminator?: string[];
      };
    };
  };
};

export const Compatibility: { [key: string]: number } = {
  grade_1: 1,
  grade_2: 2,
  both: 3,
};

export const BrailleMappings: BrailleMappingsType = {
  Indicators: {
    Compatibility: Compatibility.both,
    content: {
      number: { title: "Numeric", keystroke: ["3456"], terminator: ["0", "36", "636"] },
      capital_letter: { title: "Capital letter", keystroke: ["6"] },
      capital_word: { title: "Capital word", keystroke: ["6", "6"] },
      capital_passage: { title: "Capital passage", keystroke: ["6", "6", "6"] },
      capital_terminator: { title: "Capital terminator", keystroke: ["6", "3"] },

      grade1_symbol: { title: "Grade 1", keystroke: ["56"] },
      grade1_word: { title: "Grade 1 word", keystroke: ["56", "56"] },
      grade1_passage: { title: "Grade 1 passage", keystroke: ["56", "56", "56"] },
      grade1_terminator: { title: "Grade 1 terminator", keystroke: ["56", "3"] },

      italic_symbol: { title: "Italic", keystroke: ["46", "23"] },
      italic_word: { title: "Italic word", keystroke: ["46", "2"] },
      italic_passage: { title: "Italic passage", keystroke: ["46", "2356"] },
      italic_terminator: { title: "Italic terminator", keystroke: ["46", "3"] },

      bold_symbol: { title: "Bold", keystroke: ["45", "23"] },
      bold_word: { title: "Bold word", keystroke: ["45", "2"] },
      bold_passage: { title: "Bold passage", keystroke: ["45", "2356"] },
      bold_terminator: { title: "Bold terminator", keystroke: ["45", "3"] },

      underline_symbol: { title: "Underline", keystroke: ["456", "23"] },
      underline_word: { title: "Underline word", keystroke: ["456", "2"] },
      underline_passage: { title: "Underline passage", keystroke: ["456", "2356"] },
      underline_terminator: { title: "Underline terminator", keystroke: ["456", "3"] },
    },
  },

  Alphabet: {
    Compatibility: Compatibility.grade_1,
    content: {
      a: { title: "a", keystroke: ["1"] },
      b: { title: "b", keystroke: ["12"] },
      c: { title: "c", keystroke: ["14"] },
      d: { title: "d", keystroke: ["145"] },
      e: { title: "e", keystroke: ["15"] },
      f: { title: "f", keystroke: ["124"] },
      g: { title: "g", keystroke: ["1245"] },
      h: { title: "h", keystroke: ["125"] },
      i: { title: "i", keystroke: ["24"] },
      j: { title: "j", keystroke: ["245"] },

      k: { title: "k", keystroke: ["13"] },
      l: { title: "l", keystroke: ["123"] },
      m: { title: "m", keystroke: ["134"] },
      n: { title: "n", keystroke: ["1345"] },
      o: { title: "o", keystroke: ["135"] },
      p: { title: "p", keystroke: ["1234"] },
      q: { title: "q", keystroke: ["12345"] },
      r: { title: "r", keystroke: ["1235"] },
      s: { title: "s", keystroke: ["234"] },
      t: { title: "t", keystroke: ["2345"] },

      u: { title: "u", keystroke: ["136"] },
      v: { title: "v", keystroke: ["1236"] },
      w: { title: "w", keystroke: ["2456"] },
      x: { title: "x", keystroke: ["1346"] },
      y: { title: "y", keystroke: ["13456"] },
      z: { title: "z", keystroke: ["1356"] },
    },
  },

  Numbers: {
    Compatibility: Compatibility.both,
    content: {
      1: { title: "1", keystroke: ["1"] },
      2: { title: "2", keystroke: ["12"] },
      3: { title: "3", keystroke: ["14"] },
      4: { title: "4", keystroke: ["145"] },
      5: { title: "5", keystroke: ["15"] },
      6: { title: "6", keystroke: ["124"] },
      7: { title: "7", keystroke: ["1245"] },
      8: { title: "8", keystroke: ["125"] },
      9: { title: "9", keystroke: ["24"] },
      0: { title: "0", keystroke: ["245"] },
    },
  },

  Punctuation: {
    Compatibility: Compatibility.both,
    content: {
      comma: { title: "Comma", symbol: ",", keystroke: ["2"] },
      period: { title: "Period", symbol: ".", keystroke: ["256"] },
      apostrophe: { title: "Apostrophe", symbol: "'", keystroke: ["3"] },
      colon: { title: "Colon", symbol: ":", keystroke: ["25"] },
      dash: { title: "Dash", symbol: "–", keystroke: ["6", "36"] },

      long_dash: { title: "Long dash", symbol: "——", keystroke: ["5", "6", "36"] },
      exclamation_mark: { title: "Exclamation mark", symbol: "!", keystroke: ["235"] },
      hyphen: { title: "Hyphen", symbol: "-", keystroke: ["36"] },
      question_mark: { title: "Question mark", symbol: "?", keystroke: ["236"] },
      semicolon: { title: "Semicolon", symbol: ";", keystroke: ["23"] },

      ellipsis: { title: "Ellipsis", symbol: "…", keystroke: ["256", "256", "256"] },
      forward_slash: { title: "Forward slash", symbol: "/", keystroke: ["456", "34"] },
      backward_slash: { title: "Backward slash", symbol: "\\", keystroke: ["456", "16"] },

      opening_outer_quotation_mark: { title: "Opening outer quotation mark", symbol: "“", keystroke: ["45"] },
      closing_outer_quatation_mark: { title: "Closing outer quatation mark", symbol: "”", keystroke: ["45"] },
      opening_inner_quotation_mark: { title: "Opening inner quotation mark", symbol: "‘", keystroke: ["6", "236"] },
      closing_inner_quotation_mark: { title: "Closing inner quotation mark", symbol: "’", keystroke: ["6", "356"] },
    },
  },

  "Grouping Punctuation": {
    Compatibility: Compatibility.both,
    content: {
      opening_round_parentheses: { title: "Opening round parentheses", symbol: "(", keystroke: ["5", "126"] },
      closing_round_parentheses: { title: "Closing round parentheses", symbol: ")", keystroke: ["5", "345"] },
      opening_square_bracket: { title: "Opening square bracket", symbol: "[", keystroke: ["46", "126"] },
      closing_square_bracket: { title: "Closing square bracket", symbol: "]", keystroke: ["46", "345"] },
      opening_curly_bracket: { title: "Opening curly bracket", symbol: "{", keystroke: ["456", "126"] },
      closing_curly_bracket: { title: "Closing curly bracket", symbol: "}", keystroke: ["456", "345"] },
      opening_angle_bracket: { title: "Opening angle bracket", symbol: "<", keystroke: ["4", "126"] },
      closing_angle_bracket: { title: "Closing angle bracket", symbol: ">", keystroke: ["4", "345"] },
    },
  },

  "Signs of Operation and Comparison": {
    Compatibility: Compatibility.both,
    content: {
      plus: { title: "Plus", symbol: "+", keystroke: ["5", "235"] },
      minus: { title: "Minus", symbol: "-", keystroke: ["5", "36"] },
      multiplication: { title: "Multiplication", symbol: "×", keystroke: ["5", "236"] },
      multiplication_dot: { title: "Multiplication dot", symbol: "·", keystroke: ["5", "256"] },
      division: { title: "Division", symbol: "÷", keystroke: ["5", "34"] },
      greater_than: { title: "Greater than", symbol: ">", keystroke: ["4", "345"] },
      less_than: { title: "Less than", symbol: "<", keystroke: ["4", "126"] },
      equals: { title: "Equals", symbol: "=", keystroke: ["5", "2356"] },
    },
  },

  "Currency and Measurement": {
    Compatibility: Compatibility.both,
    content: {
      cent: { title: "Cent", symbol: "¢", keystroke: ["4", "14"] },
      dollar: { title: "Dollar", symbol: "$", keystroke: ["4", "234"] },
      euro: { title: "Euro", symbol: "€", keystroke: ["4", "15"] },
      british_pound: { title: "British pound", symbol: "£", keystroke: ["4", "123"] },
      feet: { title: "Feet", symbol: "′", keystroke: ["2356"] },
      inches: { title: "Inches", symbol: "″", keystroke: ["2356", "2356"] },
    },
  },

  "Special Symbols": {
    Compatibility: Compatibility.both,
    content: {
      percentage: { title: "Percentage", symbol: "%", keystroke: ["46", "356"] },
      degree: { title: "Degree", symbol: "°", keystroke: ["45", "245"] },
      angle: { title: "Angle", symbol: "∠", keystroke: ["46", "123456"] },
      hashtag: { title: "Hashtag", symbol: "#", keystroke: ["456", "1456"] },
      ampersand: { title: "Ampersand", symbol: "&", keystroke: ["4", "12346"] },

      copyright: { title: "Copyright", symbol: "©", keystroke: ["45", "14"] },
      trademark: { title: "Trademark", symbol: "™", keystroke: ["45", "2345"] },
      superscript_indicator: { title: "Superscript indicator", keystroke: ["35"] },
      subscript_indicator: { title: "Subscript indicator", keystroke: ["26"] },
      bullet: { title: "Bullet", symbol: "•", keystroke: ["456", "256"] },

      at_sign: { title: "@ sign", symbol: "@", keystroke: ["4", "1"] },
      asterisk: { title: "Asterisk", symbol: "*", keystroke: ["5", "35"] },
    },
  },

  "Alphabet Wordsigns": {
    Compatibility: Compatibility.grade_2,
    content: {
      a: { title: "a", keystroke: ["1"] },
      but: { title: "but", keystroke: ["12"] },
      can: { title: "can", keystroke: ["14"] },
      do: { title: "do", keystroke: ["145"] },
      every: { title: "every", keystroke: ["15"] },
      from: { title: "from", keystroke: ["124"] },
      go: { title: "go", keystroke: ["1245"] },
      have: { title: "have", keystroke: ["125"] },
      i: { title: "i", keystroke: ["24"] },
      just: { title: "just", keystroke: ["245"] },

      knowledge: { title: "knowledge", keystroke: ["13"] },
      like: { title: "like", keystroke: ["123"] },
      more: { title: "more", keystroke: ["134"] },
      not: { title: "not", keystroke: ["1345"] },
      o: { title: "o", keystroke: ["135"] },
      people: { title: "people", keystroke: ["1234"] },
      quite: { title: "quite", keystroke: ["12345"] },
      rather: { title: "rather", keystroke: ["1235"] },
      so: { title: "so", keystroke: ["234"] },
      that: { title: "that", keystroke: ["2345"] },

      us: { title: "us", keystroke: ["136"] },
      very: { title: "very", keystroke: ["1236"] },
      will: { title: "will", keystroke: ["2456"] },
      it: { title: "it", keystroke: ["1346"] },
      you: { title: "you", keystroke: ["13456"] },
      as: { title: "as", keystroke: ["1356"] },
    },
  },

  "Strong Contractions": {
    Compatibility: Compatibility.grade_2,
    content: {
      and: { title: "and", keystroke: ["12346"] },
      for: { title: "for", keystroke: ["123456"] },
      of: { title: "of", keystroke: ["12356"] },
      the: { title: "the", keystroke: ["2346"] },
      with: { title: "with", keystroke: ["23456"] },
    },
  },

  "Strong Wordsigns": {
    Compatibility: Compatibility.grade_2,
    content: {
      child: { title: "child", keystroke: ["16"] },
      shall: { title: "shall", keystroke: ["146"] },
      this: { title: "this", keystroke: ["1456"] },
      which: { title: "which", keystroke: ["156"] },
      out: { title: "out", keystroke: ["1256"] },
      still: { title: "still", keystroke: ["34"] },
    },
  },

  "Strong Groupsigns": {
    Compatibility: Compatibility.grade_2,
    content: {
      ch: { title: "ch", keystroke: ["16"] },
      sh: { title: "sh", keystroke: ["146"] },
      th: { title: "th", keystroke: ["1456"] },
      wh: { title: "wh", keystroke: ["156"] },
      ou: { title: "ou", keystroke: ["1256"] },

      st: { title: "st", keystroke: ["34"] },
      gh: { title: "gh", keystroke: ["126"] },
      ed: { title: "ed", keystroke: ["1246"] },
      er: { title: "er", keystroke: ["12456"] },
      ow: { title: "ow", keystroke: ["246"] },

      ar: { title: "ar", keystroke: ["345"] },
      ing: { title: "ing", keystroke: ["346"] },
    },
  },

  "Lower Groupsigns": {
    Compatibility: Compatibility.grade_2,
    content: {
      ea: { title: "ea", keystroke: ["2"] },
      bb: { title: "bb", keystroke: ["23"] },
      cc: { title: "cc", keystroke: ["25"] },
      ff: { title: "ff", keystroke: ["235"] },
      gg: { title: "gg", keystroke: ["2356"] },

      be: { title: "be", keystroke: ["23"] },
      con: { title: "con", keystroke: ["25"] },
      dis: { title: "dis", keystroke: ["256"] },
      en: { title: "en", keystroke: ["26"] },
      in: { title: "in", keystroke: ["35"] },
    },
  },

  "Lower Wordsigns": {
    Compatibility: Compatibility.grade_2,
    content: {
      be: { title: "be", keystroke: ["23"] },
      enough: { title: "enough", keystroke: ["26"] },
      were: { title: "were", keystroke: ["2356"] },
      his: { title: "his", keystroke: ["236"] },
      was: { title: "was", keystroke: ["356"] },
    },
  },

  "Initial Letter Contractions": {
    Compatibility: Compatibility.grade_2,
    content: {
      day: { title: "day", keystroke: ["5", "145"] },
      ever: { title: "ever", keystroke: ["5", "15"] },
      father: { title: "father", keystroke: ["5", "124"] },
      here: { title: "here", keystroke: ["5", "125"] },
      know: { title: "know", keystroke: ["5", "13"] },
      lord: { title: "lord", keystroke: ["5", "123"] },
      mother: { title: "mother", keystroke: ["5", "134"] },
      name: { title: "name", keystroke: ["5", "1345"] },
      one: { title: "one", keystroke: ["5", "135"] },
      part: { title: "part", keystroke: ["5", "1234"] },
      question: { title: "question", keystroke: ["5", "12345"] },
      right: { title: "right", keystroke: ["5", "1235"] },
      some: { title: "some", keystroke: ["5", "234"] },
      time: { title: "time", keystroke: ["5", "2345"] },
      under: { title: "under", keystroke: ["5", "136"] },
      work: { title: "work", keystroke: ["5", "2456"] },
      young: { title: "young", keystroke: ["5", "13456"] },

      there: { title: "there", keystroke: ["5", "2346"] },
      character: { title: "character", keystroke: ["5", "16"] },
      through: { title: "through", keystroke: ["5", "1456"] },
      where: { title: "where", keystroke: ["5", "156"] },
      ought: { title: "ought", keystroke: ["5", "1256"] },
      upon: { title: "upon", keystroke: ["45", "136"] },
      word: { title: "word", keystroke: ["45", "2456"] },
      these: { title: "these", keystroke: ["45", "2346"] },
      those: { title: "those", keystroke: ["45", "1456"] },
      whose: { title: "whose", keystroke: ["45", "156"] },

      cannot: { title: "cannot", keystroke: ["456", "14"] },
      had: { title: "had", keystroke: ["456", "125"] },
      many: { title: "many", keystroke: ["456", "134"] },
      spirit: { title: "spirit", keystroke: ["456", "234"] },
      world: { title: "world", keystroke: ["456", "2456"] },
      their: { title: "their", keystroke: ["456", "2346"] },
    },
  },

  "Final-letter Groupsigns": {
    Compatibility: Compatibility.grade_2,
    content: {
      ound: { title: "ound", keystroke: ["46", "145"] },
      ance: { title: "ance", keystroke: ["46", "15"] },
      sion: { title: "sion", keystroke: ["46", "1345"] },
      less: { title: "less", keystroke: ["46", "234"] },
      ount: { title: "ount", keystroke: ["46", "2345"] },

      ence: { title: "ence", keystroke: ["56", "15"] },
      ong: { title: "ong", keystroke: ["56", "1245"] },
      ful: { title: "ful", keystroke: ["56", "123"] },
      tion: { title: "tion", keystroke: ["56", "1345"] },
      ness: { title: "ness", keystroke: ["56", "234"] },
      ment: { title: "ment", keystroke: ["56", "2345"] },
      ity: { title: "ity", keystroke: ["56", "13456"] },
    },
  },

  "Shortform Words": {
    Compatibility: Compatibility.grade_2,
    content: {
      about: { title: "about", keystroke: ["1", "12"] },
      above: { title: "above", keystroke: ["1", "12", "1236"] },
      according: { title: "according", keystroke: ["1", "14"] },
      across: { title: "across", keystroke: ["1", "14", "1235"] },
      after: { title: "after", keystroke: ["1", "124"] },
      afternoon: { title: "afternoon", keystroke: ["1", "124", "1345"] },
      afterward: { title: "afterward", keystroke: ["1", "124", "2456"] },
      again: { title: "again", keystroke: ["1", "1245"] },
      against: { title: "against", keystroke: ["1", "1245", "34"] },
      almost: { title: "almost", keystroke: ["1", "123", "134"] },
      already: { title: "already", keystroke: ["1", "123", "1235"] },
      also: { title: "also", keystroke: ["1", "123"] },
      altogether: { title: "altogether", keystroke: ["1", "123", "2345"] },
      although: { title: "although", keystroke: ["1", "123", "1456"] },
      always: { title: "always", keystroke: ["1", "123", "2456"] },
      because: { title: "because", keystroke: ["23", "14"] },
      before: { title: "before", keystroke: ["23", "124"] },
      behind: { title: "behind", keystroke: ["23", "125"] },
      below: { title: "below", keystroke: ["23", "123"] },
      beneath: { title: "beneath", keystroke: ["23", "1345"] },
      beside: { title: "beside", keystroke: ["23", "234"] },
      between: { title: "between", keystroke: ["23", "2345"] },
      beyond: { title: "beyond", keystroke: ["23", "13456"] },
      blind: { title: "blind", keystroke: ["12", "123"] },
      braille: { title: "braille", keystroke: ["12", "1235", "123"] },
      children: { title: "children", keystroke: ["16", "1345"] },
      conceive: { title: "conceive", keystroke: ["25", "14", "1236"] },
      conceiving: { title: "conceiving", keystroke: ["25", "14", "1236", "1245"] },
      could: { title: "could", keystroke: ["14", "145"] },
      deceive: { title: "deceive", keystroke: ["145", "14", "1236"] },
      deceiving: { title: "deceiving", keystroke: ["145", "14", "1236", "1245"] },
      declare: { title: "declare", keystroke: ["145", "14", "123"] },
      declaring: { title: "declaring", keystroke: ["145", "14", "123", "1245"] },
      either: { title: "either", keystroke: ["15", "24"] },
      first: { title: "first", keystroke: ["124", "34"] },
      friend: { title: "friend", keystroke: ["124", "1235"] },
      good: { title: "good", keystroke: ["1245", "145"] },
      great: { title: "great", keystroke: ["1245", "1235", "2345"] },
      herself: { title: "herself", keystroke: ["125", "12456", "124", "1345"] },
      him: { title: "him", keystroke: ["125", "134"] },
      himself: { title: "himself", keystroke: ["125", "12456", "124"] },
      immediate: { title: "immediate", keystroke: ["24", "134", "134"] },
      its: { title: "its", keystroke: ["1346", "234"] },
      itself: { title: "itself", keystroke: ["1346", "124"] },
      letter: { title: "letter", keystroke: ["123", "1235"] },
      little: { title: "little", keystroke: ["123", "123"] },
      much: { title: "much", keystroke: ["134", "16"] },
      must: { title: "must", keystroke: ["134", "34"] },
      myself: { title: "myself", keystroke: ["134", "13456", "124"] },
      necessary: { title: "necessary", keystroke: ["1345", "15", "14"] },
      neither: { title: "neither", keystroke: ["1345", "15", "24"] },
      oneself: { title: "oneself", keystroke: ["5", "135", "124"] },
      ourselves: { title: "ourselves", keystroke: ["1256", "1235", "1236", "234"] },
      paid: { title: "paid", keystroke: ["1234", "145"] },
      perceive: { title: "perceive", keystroke: ["1234", "12456", "14", "1236"] },
      perceiving: { title: "perceiving", keystroke: ["1234", "12456", "14", "1236", "1245"] },
      perhaps: { title: "perhaps", keystroke: ["1234", "12456", "125"] },
      quick: { title: "quick", keystroke: ["12345", "13"] },
      receive: { title: "receive", keystroke: ["1235", "14", "1236"] },
      receiving: { title: "receiving", keystroke: ["1235", "14", "1236", "1245"] },
      rejoice: { title: "rejoice", keystroke: ["1235", "245", "14"] },
      rejoicing: { title: "rejoicing", keystroke: ["1235", "245", "14", "1245"] },
      said: { title: "said", keystroke: ["234", "145"] },
      should: { title: "should", keystroke: ["146", "145"] },
      such: { title: "such", keystroke: ["234", "16"] },
      themselves: { title: "themselves", keystroke: ["2346", "134", "1236", "234"] },
      thyself: { title: "thyself", keystroke: ["1456", "13456", "124"] },
      today: { title: "today", keystroke: ["2345", "145"] },
      together: { title: "together", keystroke: ["2345", "1245", "1235"] },
      tomorrow: { title: "tomorrow", keystroke: ["2345", "134"] },
      tonight: { title: "tonight", keystroke: ["2345", "1345"] },
      would: { title: "would", keystroke: ["2456", "145"] },
      your: { title: "your", keystroke: ["13456", "1235"] },
      yourself: { title: "yourself", keystroke: ["13456", "1235", "124"] },
      yourselves: { title: "yourselves", keystroke: ["13456", "1235", "1236", "234"] },
    },
  },
};

export const BrailleUnicode: { [key: string]: string } = {
  "0": "⠀",
  "1": "⠁",
  "2": "⠂",
  "12": "⠃",
  "3": "⠄",
  "13": "⠅",
  "23": "⠆",
  "123": "⠇",
  "4": "⠈",
  "14": "⠉",
  "24": "⠊",
  "124": "⠋",
  "34": "⠌",
  "134": "⠍",
  "234": "⠎",
  "1234": "⠏",
  "5": "⠐",
  "15": "⠑",
  "25": "⠒",
  "125": "⠓",
  "35": "⠔",
  "135": "⠕",
  "235": "⠖",
  "1235": "⠗",
  "45": "⠘",
  "145": "⠙",
  "245": "⠚",
  "1245": "⠛",
  "345": "⠜",
  "1345": "⠝",
  "2345": "⠞",
  "12345": "⠟",
  "6": "⠠",
  "16": "⠡",
  "26": "⠢",
  "126": "⠣",
  "36": "⠤",
  "136": "⠥",
  "236": "⠦",
  "1236": "⠧",
  "46": "⠨",
  "146": "⠩",
  "246": "⠪",
  "1246": "⠫",
  "346": "⠬",
  "1346": "⠭",
  "2346": "⠮",
  "12346": "⠯",
  "56": "⠰",
  "156": "⠱",
  "256": "⠲",
  "1256": "⠳",
  "356": "⠴",
  "1356": "⠵",
  "2356": "⠶",
  "12356": "⠷",
  "456": "⠸",
  "1456": "⠹",
  "2456": "⠺",
  "12456": "⠻",
  "3456": "⠼",
  "13456": "⠽",
  "23456": "⠾",
  "123456": "⠿",
};
