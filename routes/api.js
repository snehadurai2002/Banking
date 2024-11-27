const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

// Create account
router.post('/accounts', async (req, res) => {
  const { accountNumber, name } = req.body;

  try {
    const newAccount = new Account({ accountNumber, name });
    await newAccount.save();
    res.status(201).send(newAccount);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get account details
router.get('/accounts/:accountNumber', async (req, res) => {
  try {
    const account = await Account.findOne({ accountNumber: req.params.accountNumber });
    if (!account) return res.status(404).send('Account not found');
    res.send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deposit money
router.post('/accounts/:accountNumber/deposit', async (req, res) => {
  const { amount } = req.body;

  try {
    const account = await Account.findOne({ accountNumber: req.params.accountNumber });
    if (!account) return res.status(404).send('Account not found');

    account.balance += amount;
    await account.save();
    res.send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Withdraw money
router.post('/accounts/:accountNumber/withdraw', async (req, res) => {
  const { amount } = req.body;

  try {
    const account = await Account.findOne({ accountNumber: req.params.accountNumber });
    if (!account) return res.status(404).send('Account not found');

    if (account.balance < amount) return res.status(400).send('Insufficient balance');

    account.balance -= amount;
    await account.save();
    res.send(account);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
