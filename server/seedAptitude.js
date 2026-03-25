const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

const questions = [
  {
    question: "A train 150m long passes a pole in 15 seconds. What is the speed of the train?",
    options: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
    correctAnswer: "10 m/s",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "If 20% of a number is 80, what is the number?",
    options: ["300", "400", "500", "600"],
    correctAnswer: "400",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "A can do a work in 10 days, B in 15 days. How many days will they take together?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "The ratio of two numbers is 3:5. If their sum is 96, find the larger number.",
    options: ["36", "48", "60", "72"],
    correctAnswer: "60",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "What is the simple interest on Rs. 5000 at 8% per annum for 3 years?",
    options: ["Rs. 1000", "Rs. 1200", "Rs. 1500", "Rs. 1800"],
    correctAnswer: "Rs. 1200",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "A shopkeeper sells an item at 20% profit. If the cost price is Rs. 500, what is the selling price?",
    options: ["Rs. 550", "Rs. 580", "Rs. 600", "Rs. 620"],
    correctAnswer: "Rs. 600",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "Find the LCM of 12, 18 and 24.",
    options: ["36", "48", "72", "96"],
    correctAnswer: "72",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "Two pipes A and B can fill a tank in 20 and 30 minutes. Both opened together, in how many minutes will the tank be full?",
    options: ["10", "12", "15", "18"],
    correctAnswer: "12",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "A boat travels 20 km upstream in 4 hours and 20 km downstream in 2 hours. What is the speed of the stream?",
    options: ["2.5 km/h", "3 km/h", "4 km/h", "5 km/h"],
    correctAnswer: "2.5 km/h",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "The compound interest on Rs. 10000 at 10% per annum for 2 years is?",
    options: ["Rs. 2000", "Rs. 2100", "Rs. 2200", "Rs. 2500"],
    correctAnswer: "Rs. 2100",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "If the radius of a circle is doubled, its area becomes how many times?",
    options: ["2 times", "3 times", "4 times", "8 times"],
    correctAnswer: "4 times",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "A man covers a distance at 60 km/h and returns at 40 km/h. What is the average speed?",
    options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"],
    correctAnswer: "48 km/h",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "In how many ways can 5 people be arranged in a row?",
    options: ["60", "100", "120", "150"],
    correctAnswer: "120",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "What is the probability of getting a head when a coin is tossed?",
    options: ["1/4", "1/3", "1/2", "1"],
    correctAnswer: "1/2",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "The HCF of 36 and 48 is?",
    options: ["6", "8", "12", "18"],
    correctAnswer: "12",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "A number when divided by 6 leaves remainder 3. What is the remainder when divided by 3?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "0",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "If 3x + 5 = 20, what is x?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "A sum doubles itself in 10 years at simple interest. What is the rate of interest?",
    options: ["5%", "8%", "10%", "12%"],
    correctAnswer: "10%",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "What is 15% of 240?",
    options: ["30", "36", "40", "42"],
    correctAnswer: "36",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "The average of 5 numbers is 20. If one number is removed, the average becomes 18. What is the removed number?",
    options: ["24", "26", "28", "30"],
    correctAnswer: "28",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "A rectangle has length 12 cm and breadth 8 cm. What is its perimeter?",
    options: ["36 cm", "40 cm", "44 cm", "48 cm"],
    correctAnswer: "40 cm",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "In how many ways can 2 boys be selected from a group of 5?",
    options: ["8", "10", "12", "15"],
    correctAnswer: "10",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "A train 200m long crosses a bridge 300m long at 50 m/s. How long does it take?",
    options: ["8 sec", "10 sec", "12 sec", "15 sec"],
    correctAnswer: "10 sec",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "What is the square root of 1764?",
    options: ["40", "42", "44", "46"],
    correctAnswer: "42",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "If cost price is Rs. 400 and loss is 10%, what is the selling price?",
    options: ["Rs. 340", "Rs. 350", "Rs. 360", "Rs. 380"],
    correctAnswer: "Rs. 360",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "Two dice are thrown. What is the probability of getting a sum of 7?",
    options: ["1/6", "5/36", "7/36", "1/4"],
    correctAnswer: "1/6",
    category: "aptitude",
    difficulty: "medium"
  },
  {
    question: "The volume of a cube with side 5 cm is?",
    options: ["25 cm³", "75 cm³", "100 cm³", "125 cm³"],
    correctAnswer: "125 cm³",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "A and B together earn Rs. 1200 per day. A earns Rs. 200 more than B. What does B earn?",
    options: ["Rs. 400", "Rs. 450", "Rs. 500", "Rs. 550"],
    correctAnswer: "Rs. 500",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "What is the next prime number after 13?",
    options: ["15", "16", "17", "19"],
    correctAnswer: "17",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    question: "A cistern is filled in 9 hours but leaks in 12 hours. In how many hours will it be full?",
    options: ["30", "32", "36", "40"],
    correctAnswer: "36",
    category: "aptitude",
    difficulty: "hard"
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected ✅");
    await Question.insertMany(questions);
    console.log("30 Aptitude Questions Added ✅🔥");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
