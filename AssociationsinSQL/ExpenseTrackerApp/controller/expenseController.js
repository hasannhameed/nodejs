const {Expense} = require('../model/expenseModel');
const path = require('path');


    const viewExpense = async(req, res)=>{
        const filepath = path.join(__dirname, '..', 'public', 'view.html');
        res.status(200).sendFile(filepath);
    }


//controller
    const getExpense = async(req, res)=>{
        const id = req.params.id;
        const expense = await Expense.findByPk(id);
        if (expense) {
            res.status(200).json({expense});
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    }

    const getExpenses = async(req, res)=>{
        try{
            const expenses = await Expense.findAll();
            res.status(200).json({expenses });
        }catch(error){
            res.status(500).json({ message: error.message });
        }
        const expenses = await Expense.findAll();
        res.status(200).json({expenses });
    }

    const postExpense = async()=>{
        const {description, amount, date} = req.body;
        try{
            const expense = await Expense.create({description, amount, date});
            res.status(201).json({expense});
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }

    const updateExpense = async(req, res)=>{
        const id = req.params.id;
        const {description, amount, date} = req.body;
        try{
            const expense = await Expense.update({description, amount, date}, {where: {id}});
            if (expense[0] > 0) {
                const updatedExpense = await Expense.findByPk(id);
                res.status(200).json({expense: updatedExpense});
            } else {
                res.status(404).json({ message: 'Expense not found' });
            }
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }

    const deleteExpense = async(req, res)=>{
        const id = req.params.id;
        try{
            const deleted = await Expense.destroy({where: {id}});
            if (deleted) {
                res.status(200).json({ message: 'Expense deleted' });
            } else {
                res.status(404).json({ message: 'Expense not found' });
            }
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }



    module.exports = {getExpense, getExpenses, postExpense, updateExpense, deleteExpense, viewExpense};