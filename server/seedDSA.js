const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

const questions = [
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswer: "O(log n)",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "Which data structure uses LIFO order?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: "Stack",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "What is the worst case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n²)",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "Which traversal of a BST gives elements in sorted order?",
    options: ["Preorder", "Postorder", "Inorder", "Level order"],
    correctAnswer: "Inorder",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "What is the space complexity of Merge Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "Which data structure is used in BFS traversal of a graph?",
    options: ["Stack", "Queue", "Heap", "Tree"],
    correctAnswer: "Queue",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "What is the height of a complete binary tree with n nodes?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: "O(log n)",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "Which algorithm is used to find the shortest path in an unweighted graph?",
    options: ["DFS", "Dijkstra", "BFS", "Bellman-Ford"],
    correctAnswer: "BFS",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "What is the time complexity of inserting an element in a Hash Table (average case)?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: "O(1)",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "Which of the following is NOT a self-balancing BST?",
    options: ["AVL Tree", "Red-Black Tree", "Binary Search Tree", "Splay Tree"],
    correctAnswer: "Binary Search Tree",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "What is the maximum number of nodes in a binary tree of height h?",
    options: ["2h", "2h - 1", "2^(h+1) - 1", "h²"],
    correctAnswer: "2^(h+1) - 1",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "Which sorting algorithm is stable?",
    options: ["QuickSort", "HeapSort", "Merge Sort", "Selection Sort"],
    correctAnswer: "Merge Sort",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "What is the time complexity of Dijkstra's algorithm using a min-heap?",
    options: ["O(V²)", "O(E log V)", "O(V log V)", "O(E + V)"],
    correctAnswer: "O(E log V)",
    category: "dsa",
    difficulty: "hard"
  },
  {
    question: "In a doubly linked list, how many pointers does each node have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "Which data structure is best for implementing a priority queue?",
    options: ["Stack", "Queue", "Heap", "Array"],
    correctAnswer: "Heap",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "What is the time complexity of Floyd-Warshall algorithm?",
    options: ["O(V²)", "O(V³)", "O(E log V)", "O(V + E)"],
    correctAnswer: "O(V³)",
    category: "dsa",
    difficulty: "hard"
  },
  {
    question: "Which of the following problems is solved using Dynamic Programming?",
    options: ["Binary Search", "Merge Sort", "0/1 Knapsack", "BFS"],
    correctAnswer: "0/1 Knapsack",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: "O(1)",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "Which data structure is used in DFS traversal of a graph?",
    options: ["Queue", "Stack", "Heap", "Array"],
    correctAnswer: "Stack",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "What is the worst case time complexity of searching in a BST?",
    options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
    correctAnswer: "O(n)",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "Which algorithm finds the Minimum Spanning Tree of a graph?",
    options: ["Dijkstra", "Kruskal", "Floyd-Warshall", "BFS"],
    correctAnswer: "Kruskal",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "What is the time complexity of Bubble Sort in the best case?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
    correctAnswer: "O(n)",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "How many edges does a complete graph with n vertices have?",
    options: ["n", "n-1", "n(n-1)/2", "n²"],
    correctAnswer: "n(n-1)/2",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "Which of the following is used to detect a cycle in a directed graph?",
    options: ["BFS", "DFS with visited array", "Dijkstra", "Kruskal"],
    correctAnswer: "DFS with visited array",
    category: "dsa",
    difficulty: "hard"
  },
  {
    question: "What is the time complexity of Heap Sort?",
    options: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
    correctAnswer: "O(n log n)",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "In which case does a hash table have O(n) search time?",
    options: ["Best case", "Average case", "Worst case", "All cases"],
    correctAnswer: "Worst case",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "What is a deque?",
    options: ["A queue with priority", "A double-ended queue", "A circular queue", "A stack"],
    correctAnswer: "A double-ended queue",
    category: "dsa",
    difficulty: "easy"
  },
  {
    question: "Which traversal is used to delete a tree?",
    options: ["Preorder", "Inorder", "Postorder", "Level order"],
    correctAnswer: "Postorder",
    category: "dsa",
    difficulty: "medium"
  },
  {
    question: "What is the time complexity of building a heap from n elements?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: "O(n)",
    category: "dsa",
    difficulty: "hard"
  },
  {
    question: "Which data structure is used to implement recursion internally?",
    options: ["Queue", "Stack", "Heap", "Array"],
    correctAnswer: "Stack",
    category: "dsa",
    difficulty: "easy"
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB Connected ✅");
    await Question.insertMany(questions);
    console.log("30 DSA Questions Added ✅🔥");
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
