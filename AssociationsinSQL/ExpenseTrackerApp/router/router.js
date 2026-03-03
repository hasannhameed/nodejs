 //routes
    const express = require('express');
    const router = express.Router();
    const {getExpense, getExpenses, postExpense, updateExpense, deleteExpense, viewExpense} = require('../controller/expenseController');

    router.get('/expenses', getExpenses);
    router.get('/expenses/:id', getExpense);
    router.post('/expenses', postExpense);
    router.put('/expenses/:id', updateExpense);
    router.delete('/expenses/:id', deleteExpense);
    router.get('/api', viewExpense);

    module.exports = router;