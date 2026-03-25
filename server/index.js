const express = require("express");
const cors = require("cors");

const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

const TestResult = require("./models/TestResult");
const Question = require("./models/Question");
const Setting = require("./models/Setting");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.options("*", cors());         
app.use(express.json());

const User = require("./models/User");

app.get("/",(req,res)=>{
    res.send("Server Running");
});

app.post("/test",(req,res)=>{
    console.log(req.body);
    res.json({message:"Data received"});
});

app.post("/create-user", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json(user);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful ✅",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/profile", authMiddleware, async (req, res) => {
  res.json(req.user);
});



app.post("/add-question", authMiddleware, adminMiddleware, async (req, res) => {
  try {

    const { question, options, correctAnswer, category, difficulty } = req.body;

    // ✅ Empty checks
    if (!question || question.trim() === "") {
      return res.status(400).json({ message: "Question required ❌" });
    }

    if (!options || options.length < 4) {
      return res.status(400).json({ message: "Minimum 4 options required ❌" });
    }

    if (!correctAnswer) {
      return res.status(400).json({ message: "Correct answer required ❌" });
    }

    // ✅ Enum safety
    const validCategories = ["aptitude", "dsa", "technical", "mern", "reasoning"];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category ❌" });
    }

    const validDifficulties = ["easy", "medium", "hard"];

    if (difficulty && !validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty ❌" });
    }

    const newQuestion = await Question.create(req.body);

    res.json({
      message: "Question Added Successfully ✅🔥",
      question: newQuestion
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/questions", async (req, res) => {
  try {
    const { category, difficulty, sort, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const skip = (Number(page) - 1) * Number(limit);

    let query = Question.find(filter)
      .skip(skip)
      .limit(Number(limit));

    if (sort === "latest") {
      query = query.sort({ createdAt: -1 });
    }

    if (sort === "difficulty") {
      query = query.sort({ difficulty: 1 });
    }

    const questions = await query;

    const totalQuestions = await Question.countDocuments(filter);

    res.json({
      page: Number(page),
      limit: Number(limit),
      totalQuestions,
      totalPages: Math.ceil(totalQuestions / Number(limit)),
      data: questions
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/random-questions", async (req, res) => {
  try {
    const { count = 5, category } = req.query;

    const filter = category ? { category } : {};

    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: Number(count) } }
    ]);

    res.json(questions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/submit-test", async (req, res) => {
  try {

    const { answers, userId, startedAt } = req.body;

    const submittedAt = new Date();

    const start = new Date(startedAt);

    const timeTaken = Math.floor((submittedAt - start) / 1000);

    const settingData = await Setting.findOne();
    const TEST_DURATION = settingData ? settingData.testDuration : 60;

    if (timeTaken > TEST_DURATION) {
      return res.status(400).json({
        message: "Time Up ⏱️❌"
      });
    }

    let score = 0;
    let total = answers.length;

    for (let ans of answers) {

      const question = await Question.findById(ans.questionId);

      if (!question) continue;

      if (question.correctAnswer === ans.selectedAnswer) {
        score += 1;
      } else {
        score -= 0.25;
      }
    }

    const accuracy = ((score / total) * 100).toFixed(2);

    const result = await TestResult.create({
      userId,
      score: score.toFixed(2),
      total,
      accuracy: `${accuracy}%`,
      startedAt: start,
      submittedAt,
      timeTaken
    });

    res.json({
      message: "Test Submitted ✅🔥",
      score: score.toFixed(2),
      accuracy: `${accuracy}%`,
      timeTaken
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get("/my-history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await TestResult.find({ userId })
      .sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/analytics/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await TestResult.find({ userId });

    const totalTests = results.length;

    if (totalTests === 0) {
      return res.json({
        message: "No tests given yet 😄"
      });
    }

    const totalScore = results.reduce((sum, test) => sum + test.score, 0);
    const totalQuestions = results.reduce((sum, test) => sum + test.total, 0);

    const averageScore = (totalScore / totalTests).toFixed(2);
    const bestScore = Math.max(...results.map(test => test.score));

    const averageAccuracy = ((totalScore / totalQuestions) * 100).toFixed(2);

    res.json({
      totalTests,
      averageScore,
      bestScore,
      averageAccuracy: `${averageAccuracy}%`
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/progress/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await TestResult.find({ userId })
      .sort({ createdAt: 1 }); // oldest → newest

    const chartData = results.map(test => ({
      date: test.createdAt.toISOString().split("T")[0],
      score: test.score,
      accuracy: test.accuracy
    }));

    res.json(chartData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await TestResult.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
          totalQuestions: { $sum: "$total" },
          testsGiven: { $sum: 1 }
        }
      },
      {
        $addFields: {
          averageAccuracy: {
            $multiply: [
              { $divide: ["$totalScore", "$totalQuestions"] },
              100
            ]
          }
        }
      },
      {
        $sort: { averageAccuracy: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json(leaderboard);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update-question/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found ❌" });
    }

    res.json({
      message: "Question Updated ✅",
      question: updatedQuestion
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete("/delete-question/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found ❌" });
    }

    res.json({
      message: "Question Deleted ✅🗑️",
      question: deletedQuestion
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/start-test", authMiddleware, async (req, res) => {
  res.json({
    message: "Test Started ✅",
    startedAt: new Date()
  });
});

app.get("/settings", async (req, res) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) setting = await Setting.create({});
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/settings", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { testDuration, questionCount } = req.body;
    let setting = await Setting.findOne();
    if (!setting) setting = await Setting.create({});
    setting.testDuration = testDuration;
    setting.questionCount = questionCount;
    await setting.save();
    res.json({ message: "Settings Updated ✅", setting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/make-admin", async (req, res) => {

  const user = await User.findOne({ email: "admin@gmail.com" });

  if (!user) {
    return res.json({ message: "User not found ❌" });
  }

  user.role = "admin";
  await user.save();

  res.json({ message: "User is now ADMIN ✅🔥" });

});




mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server Started on port ${PORT}`);
});