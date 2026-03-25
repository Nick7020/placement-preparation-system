const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

const questions = [
  {
    question: "If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?",
    options: ["Uncle", "Father", "Grandfather", "Brother"],
    correctAnswer: "Uncle",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "In a row of 40 students, Ravi is 15th from the left. What is his position from the right?",
    options: ["25th", "26th", "27th", "24th"],
    correctAnswer: "26th",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "Find the odd one out: 2, 5, 10, 17, 26, 37, 50, 64",
    options: ["50", "37", "64", "26"],
    correctAnswer: "64",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "If MANGO is coded as OCPIQ, how is APPLE coded?",
    options: ["CRRNG", "CRRNG", "CRRNF", "DRRNG"],
    correctAnswer: "CRRNG",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "A clock shows 3:15. What is the angle between the hour and minute hand?",
    options: ["7.5°", "0°", "15°", "22.5°"],
    correctAnswer: "7.5°",
    category: "reasoning",
    difficulty: "hard"
  },
  {
    question: "Pointing to a man, a woman says 'His mother is the only daughter of my mother.' How is the woman related to the man?",
    options: ["Mother", "Grandmother", "Sister", "Aunt"],
    correctAnswer: "Mother",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "Which number comes next in the series: 1, 4, 9, 16, 25, ?",
    options: ["30", "36", "49", "35"],
    correctAnswer: "36",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "If all Roses are Flowers and some Flowers are Red, which conclusion is definitely true?",
    options: ["All Roses are Red", "Some Roses are Red", "No Rose is Red", "None of the above"],
    correctAnswer: "None of the above",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "A man walks 5 km North, then 3 km East, then 5 km South. How far is he from the starting point?",
    options: ["3 km", "5 km", "8 km", "13 km"],
    correctAnswer: "3 km",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written?",
    options: ["MFEJDJOF", "EOJDJEFM", "EDJFMNOJ", "NFEJDJOF"],
    correctAnswer: "EOJDJEFM",
    category: "reasoning",
    difficulty: "hard"
  },
  {
    question: "Find the missing number: 3, 6, 11, 18, 27, ?",
    options: ["36", "38", "39", "40"],
    correctAnswer: "38",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "If 6 * 4 = 46, 8 * 3 = 83, then 5 * 7 = ?",
    options: ["57", "75", "35", "53"],
    correctAnswer: "75",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "Which of the following is the mirror image of 'REASONING'?",
    options: ["GNINOSEAR", "REASONING", "GNINOSEAR", "REASONIGN"],
    correctAnswer: "GNINOSEAR",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "5 people are sitting in a row. A is to the left of B, C is to the right of B, D is to the left of A. Who is in the middle?",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "If the day before yesterday was Thursday, what day will be after tomorrow?",
    options: ["Monday", "Sunday", "Tuesday", "Wednesday"],
    correctAnswer: "Monday",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "A is twice as old as B. 10 years ago A was 3 times as old as B. What is A's current age?",
    options: ["30", "40", "20", "50"],
    correctAnswer: "40",
    category: "reasoning",
    difficulty: "hard"
  },
  {
    question: "Find the odd one out: Triangle, Square, Cone, Rectangle",
    options: ["Triangle", "Square", "Cone", "Rectangle"],
    correctAnswer: "Cone",
    category: "reasoning",
    difficulty: "easy"
  },
  {
    question: "In a class, 30 students play cricket, 25 play football, and 10 play both. How many play at least one sport?",
    options: ["45", "55", "65", "35"],
    correctAnswer: "45",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "Which letter comes next: A, C, F, J, O, ?",
    options: ["T", "U", "V", "W"],
    correctAnswer: "U",
    category: "reasoning",
    difficulty: "medium"
  },
  {
    question: "If FRIEND is coded as HUMJTK, how is CANDLE coded?",
    options: ["EDRIRL", "EDRIRN", "FCPFMH", "EDRIRM"],
    correctAnswer: "EDRIRN",
    category: "reasoning",
    difficulty: "hard"
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected ✅");
    await Question.insertMany(questions);
    console.log("20 Reasoning Questions Added ✅🔥");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
