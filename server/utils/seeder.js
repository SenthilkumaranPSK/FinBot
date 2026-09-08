const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcrypt');

dotenv.config();

const importData = async () => {
  try {
    console.log('Connecting to MongoDB...', process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/finpilot');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/finpilot');
    console.log('MongoDB Connected!');

    await User.deleteMany();
    await Transaction.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const createdUsers = await User.insertMany([
      { name: 'Demo User 1', email: 'demo1@example.com', password, monthlyIncome: 50000, savingsGoal: 10000 },
      { name: 'Demo User 2', email: 'demo2@example.com', password, monthlyIncome: 80000, savingsGoal: 20000 }
    ]);

    const demoUser = createdUsers[0]._id;

    await Transaction.insertMany([
      { user: demoUser, title: 'Salary', amount: 50000, category: 'Income', type: 'income', date: new Date() },
      { user: demoUser, title: 'Groceries', amount: 5000, category: 'Food', type: 'expense', date: new Date() },
      { user: demoUser, title: 'Rent', amount: 15000, category: 'Housing', type: 'expense', date: new Date() }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroy data
} else {
  importData();
}
