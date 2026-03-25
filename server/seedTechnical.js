const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

const questions = [
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Core Processing Unit", "Central Program Unit", "Control Processing Unit"],
    correctAnswer: "Central Processing Unit",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "Which of the following is NOT an operating system?",
    options: ["Windows", "Linux", "Oracle", "macOS"],
    correctAnswer: "Oracle",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "What is a deadlock in an operating system?",
    options: ["A process waiting forever", "Two processes blocking each other", "CPU overload", "Memory overflow"],
    correctAnswer: "Two processes blocking each other",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "Which normal form removes partial dependencies?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: "2NF",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is the full form of SQL?",
    options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "Sequential Query Language"],
    correctAnswer: "Structured Query Language",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "Which layer of OSI model handles routing?",
    options: ["Physical", "Data Link", "Network", "Transport"],
    correctAnswer: "Network",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is the purpose of a primary key in a database?",
    options: ["To sort records", "To uniquely identify each record", "To link two tables", "To encrypt data"],
    correctAnswer: "To uniquely identify each record",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "Which scheduling algorithm gives minimum average waiting time?",
    options: ["FCFS", "Round Robin", "SJF", "Priority"],
    correctAnswer: "SJF",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is virtual memory?",
    options: ["RAM extension using disk", "A type of cache", "GPU memory", "ROM memory"],
    correctAnswer: "RAM extension using disk",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "Which protocol is used to send emails?",
    options: ["HTTP", "FTP", "SMTP", "TCP"],
    correctAnswer: "SMTP",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "What is the difference between TCP and UDP?",
    options: ["TCP is faster", "UDP is reliable", "TCP is connection-oriented", "UDP is connection-oriented"],
    correctAnswer: "TCP is connection-oriented",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "Which SQL command is used to remove a table?",
    options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"],
    correctAnswer: "DROP",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "What is a foreign key?",
    options: ["A key from another country", "A key that references primary key of another table", "An encrypted key", "A duplicate key"],
    correctAnswer: "A key that references primary key of another table",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "What is thrashing in OS?",
    options: ["High CPU usage", "Excessive paging causing low performance", "Memory leak", "Deadlock condition"],
    correctAnswer: "Excessive paging causing low performance",
    category: "technical",
    difficulty: "hard"
  },
  {
    question: "Which data structure does OS use for process scheduling?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is the IP address of localhost?",
    options: ["192.168.0.1", "127.0.0.1", "0.0.0.0", "255.255.255.0"],
    correctAnswer: "127.0.0.1",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "Which JOIN returns all rows from both tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    correctAnswer: "FULL OUTER JOIN",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is normalization in DBMS?",
    options: ["Encrypting data", "Removing redundancy from database", "Adding indexes", "Backing up data"],
    correctAnswer: "Removing redundancy from database",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What does DNS stand for?",
    options: ["Domain Name System", "Data Network Service", "Dynamic Name Server", "Domain Network Security"],
    correctAnswer: "Domain Name System",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "Which memory is fastest?",
    options: ["RAM", "ROM", "Cache", "Hard Disk"],
    correctAnswer: "Cache",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "What is a semaphore in OS?",
    options: ["A type of memory", "A synchronization tool", "A scheduling algorithm", "A file system"],
    correctAnswer: "A synchronization tool",
    category: "technical",
    difficulty: "hard"
  },
  {
    question: "Which SQL clause is used to filter groups?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correctAnswer: "HAVING",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is the OSI model?",
    options: ["A network protocol", "A 7-layer networking framework", "An operating system", "A database model"],
    correctAnswer: "A 7-layer networking framework",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "Which of the following is a non-volatile memory?",
    options: ["RAM", "Cache", "ROM", "Register"],
    correctAnswer: "ROM",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "What is a process in OS?",
    options: ["A program on disk", "A program in execution", "A file in memory", "A CPU instruction"],
    correctAnswer: "A program in execution",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "Which HTTP method is used to update data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: "PUT",
    category: "technical",
    difficulty: "easy"
  },
  {
    question: "What is indexing in DBMS?",
    options: ["Sorting data", "Speeding up data retrieval", "Encrypting data", "Removing duplicates"],
    correctAnswer: "Speeding up data retrieval",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is the purpose of a subnet mask?",
    options: ["To encrypt IP", "To divide network into subnets", "To assign MAC address", "To route packets"],
    correctAnswer: "To divide network into subnets",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "Which of the following is a page replacement algorithm?",
    options: ["FCFS", "LRU", "SJF", "Round Robin"],
    correctAnswer: "LRU",
    category: "technical",
    difficulty: "medium"
  },
  {
    question: "What is ACID in DBMS?",
    options: ["A query language", "Properties of a transaction", "A type of join", "A normal form"],
    correctAnswer: "Properties of a transaction",
    category: "technical",
    difficulty: "medium"
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected ✅");
    await Question.insertMany(questions);
    console.log("30 Technical Questions Added ✅🔥");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
