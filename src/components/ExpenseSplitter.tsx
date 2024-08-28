import React, { useState } from 'react';

interface SplitExpense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
}

const ExpenseSplitter: React.FC = () => {
  const [expenses, setExpenses] = useState<SplitExpense[]>([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: 0,
    paidBy: '',
    splitWith: ['']
  });

  const addExpense = () => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setNewExpense({ description: '', amount: 0, paidBy: '', splitWith: [''] });
  };

  const calculateSplitAmount = (expense: SplitExpense) => {
    return expense.amount / (expense.splitWith.length + 1);
  };

  return (
    <div className="expense-splitter">
      <h2>Expense Splitter</h2>
      {expenses.map(expense => (
        <div key={expense.id} className="split-expense-item">
          <h3>{expense.description}</h3>
          <p>Total: ${expense.amount}</p>
          <p>Paid by: {expense.paidBy}</p>
          <p>Split with: {expense.splitWith.join(', ')}</p>
          <p>Each pays: ${calculateSplitAmount(expense).toFixed(2)}</p>
        </div>
      ))}
      <div className="new-expense-form">
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Paid by"
          value={newExpense.paidBy}
          onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
        />
        <input
          type="text"
          placeholder="Split with (comma-separated)"
          value={newExpense.splitWith.join(',')}
          onChange={(e) => setNewExpense({ ...newExpense, splitWith: e.target.value.split(',') })}
        />
        <button onClick={addExpense}>Add Split Expense</button>
      </div>
    </div>
  );
};

export default ExpenseSplitter;