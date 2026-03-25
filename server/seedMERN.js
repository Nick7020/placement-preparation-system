const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

const questions = [
  {
    question: "What does MERN stand for?",
    options: ["MySQL, Express, React, Node", "MongoDB, Express, React, Node", "MongoDB, Ember, React, Node", "MongoDB, Express, Redux, Node"],
    correctAnswer: "MongoDB, Express, React, Node",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useContext", "useState", "useRef"],
    correctAnswer: "useState",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is the purpose of useEffect in React?",
    options: ["To manage state", "To handle side effects", "To create context", "To optimize rendering"],
    correctAnswer: "To handle side effects",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which method in Express handles GET requests?",
    options: ["app.post()", "app.get()", "app.put()", "app.delete()"],
    correctAnswer: "app.get()",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is middleware in Express.js?",
    options: ["A database connector", "A function that runs between request and response", "A React component", "A MongoDB query"],
    correctAnswer: "A function that runs between request and response",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "Which MongoDB method is used to find all documents?",
    options: ["findOne()", "findAll()", "find()", "getAll()"],
    correctAnswer: "find()",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is JSX in React?",
    options: ["A JavaScript library", "JavaScript XML syntax extension", "A CSS framework", "A Node module"],
    correctAnswer: "JavaScript XML syntax extension",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is the virtual DOM in React?",
    options: ["A real browser DOM", "A lightweight copy of the real DOM", "A CSS framework", "A database"],
    correctAnswer: "A lightweight copy of the real DOM",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "Which package is used to connect MongoDB with Node.js?",
    options: ["express", "mongoose", "cors", "dotenv"],
    correctAnswer: "mongoose",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What does JWT stand for?",
    options: ["Java Web Token", "JSON Web Token", "JavaScript Web Transfer", "JSON Web Transfer"],
    correctAnswer: "JSON Web Token",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which React hook is used to access context?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: "useContext",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "What is the default port of a React Vite app?",
    options: ["3000", "4000", "5173", "8080"],
    correctAnswer: "5173",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which HTTP status code means 'Not Found'?",
    options: ["200", "201", "400", "404"],
    correctAnswer: "404",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is CORS?",
    options: ["A database", "Cross-Origin Resource Sharing", "A React hook", "A Node module"],
    correctAnswer: "Cross-Origin Resource Sharing",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "Which MongoDB operator is used for 'greater than'?",
    options: ["$lt", "$gt", "$gte", "$eq"],
    correctAnswer: "$gt",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "What is the purpose of useRef in React?",
    options: ["To manage state", "To access DOM elements directly", "To fetch data", "To handle routing"],
    correctAnswer: "To access DOM elements directly",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "Which command creates a new React app using Vite?",
    options: ["npx create-react-app", "npm create vite@latest", "npm init react", "npx react-create-app"],
    correctAnswer: "npm create vite@latest",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What does res.json() do in Express?",
    options: ["Parses JSON", "Sends JSON response", "Reads JSON file", "Validates JSON"],
    correctAnswer: "Sends JSON response",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which hook replaces componentDidMount in React?",
    options: ["useState", "useEffect with empty array", "useContext", "useCallback"],
    correctAnswer: "useEffect with empty array",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "What is bcrypt used for in Node.js?",
    options: ["Database connection", "Password hashing", "JWT generation", "File upload"],
    correctAnswer: "Password hashing",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which MongoDB method updates a document?",
    options: ["findByIdAndDelete", "findByIdAndUpdate", "findOneAndCreate", "updateAll"],
    correctAnswer: "findByIdAndUpdate",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is React Router used for?",
    options: ["State management", "Client-side routing", "API calls", "Styling"],
    correctAnswer: "Client-side routing",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is the purpose of .env file in Node.js?",
    options: ["To store components", "To store environment variables", "To configure routes", "To define schemas"],
    correctAnswer: "To store environment variables",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which React hook is used for performance optimization?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    correctAnswer: "useMemo",
    category: "mern",
    difficulty: "hard"
  },
  {
    question: "What is the purpose of next() in Express middleware?",
    options: ["To end the request", "To pass control to next middleware", "To send response", "To redirect"],
    correctAnswer: "To pass control to next middleware",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "Which MongoDB method removes a document by ID?",
    options: ["findByIdAndUpdate", "findByIdAndDelete", "deleteOne", "removeById"],
    correctAnswer: "findByIdAndDelete",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is prop drilling in React?",
    options: ["Passing props through multiple components", "A React hook", "A routing method", "A state management tool"],
    correctAnswer: "Passing props through multiple components",
    category: "mern",
    difficulty: "medium"
  },
  {
    question: "Which status code means 'Created Successfully'?",
    options: ["200", "201", "204", "301"],
    correctAnswer: "201",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "What is the use of mongoose Schema?",
    options: ["To define API routes", "To define structure of MongoDB documents", "To handle authentication", "To manage state"],
    correctAnswer: "To define structure of MongoDB documents",
    category: "mern",
    difficulty: "easy"
  },
  {
    question: "Which hook is used to dispatch actions in useReducer?",
    options: ["useState", "dispatch", "useEffect", "useContext"],
    correctAnswer: "dispatch",
    category: "mern",
    difficulty: "hard"
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected ✅");
    await Question.insertMany(questions);
    console.log("30 MERN Questions Added ✅🔥");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
