import React, { useState } from 'react';
import { Transaction } from '../App';

interface Props {
  transactions: Transaction[];
}

const BudgetPlanner: React.FC<Props> = ({ transactions }) => {
  const [budgets, setBudgets] = useState<{[key: string]: number}>({});

  const handleBudgetChange = (category: string, amount: number) => {
    setBudgets({ ...budgets, [category]: amount });
  };

  const calculateSpending = (category: string) => {
    return transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="budget-planner">
      <h2>Budget Planner</h2>
      {Object.entries(budgets).map(([category, budget]) => (
        <div key={category} className="budget-item">
          <h3>{category}</h3>
          <input
            type="number"
            value={budget}
            onChange={(e) => handleBudgetChange(category, Number(e.target.value))}
          />
          <p>Spent: ${calculateSpending(category)}</p>
          <p>Remaining: ${budget - calculateSpending(category)}</p>
        </div>
      ))}
      <button onClick={() => handleBudgetChange('New Category', 0)}>Add Category</button>
    </div>
  );
};

export default BudgetPlanner;