import React, { useState, FormEvent } from 'react';
import { Transaction } from '../App';

interface Props {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  isDarkMode: boolean;
  categories: string[];
  sources: string[];
  addCategory: (category: string) => void;
  addSource: (source: string) => void;
}

const TransactionForm: React.FC<Props> = ({ addTransaction, isDarkMode, categories, sources, addCategory, addSource }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSource, setNewSource] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTransaction({
      amount: parseFloat(amount) || 0,
      description,
      source,
      date: new Date().toISOString().split('T')[0],
      category,
    });
    setAmount('');
    setDescription('');
    setSource('');
    setCategory('');
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleAddSource = () => {
    if (newSource.trim()) {
      addSource(newSource.trim());
      setNewSource('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`transaction-form ${isDarkMode ? 'dark' : ''}`}>
      <h2>Add New Transaction</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
      >
        <option value="">Select source</option>
        {sources.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div className="custom-input">
        <input
          type="text"
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
          placeholder="Add new source"
        />
        <button type="button" onClick={handleAddSource}>Add</button>
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <div className="custom-input">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
        />
        <button type="button" onClick={handleAddCategory}>Add</button>
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;