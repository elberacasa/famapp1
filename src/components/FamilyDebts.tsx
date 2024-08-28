import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Debt {
  id: number;
  from: string;
  to: string;
  amount: number;
  description: string;
}

interface Props {
  isDarkMode: boolean;
}

const FamilyDebts: React.FC<Props> = ({ isDarkMode }) => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [newDebt, setNewDebt] = useState<Omit<Debt, 'id'>>({
    from: '',
    to: '',
    amount: 0,
    description: '',
  });

  const addDebt = (e: React.FormEvent) => {
    e.preventDefault();
    setDebts([...debts, { ...newDebt, id: Date.now() }]);
    setNewDebt({ from: '', to: '', amount: 0, description: '' });
  };

  const removeDebt = (id: number) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  return (
    <div className={`family-debts ${isDarkMode ? 'dark' : ''}`}>
      <h2>Family Debts</h2>
      <form onSubmit={addDebt} className="debt-form">
        <input
          type="text"
          placeholder="From"
          value={newDebt.from}
          onChange={(e) => setNewDebt({ ...newDebt, from: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="To"
          value={newDebt.to}
          onChange={(e) => setNewDebt({ ...newDebt, to: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newDebt.amount}
          onChange={(e) => setNewDebt({ ...newDebt, amount: parseFloat(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newDebt.description}
          onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
          required
        />
        <button type="submit">Add Debt</button>
      </form>
      <TransitionGroup className="debt-list">
        {debts.map((debt) => (
          <CSSTransition key={debt.id} timeout={300} classNames="fade">
            <div className="debt-item">
              <span>{debt.from} owes {debt.to}</span>
              <span>${debt.amount.toFixed(2)}</span>
              <span>{debt.description}</span>
              <button onClick={() => removeDebt(debt.id)}>Remove</button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default FamilyDebts;