import React, { useState, useMemo } from 'react';
import { Transaction } from '../App';

interface Props {
  transactions: Transaction[];
  editTransaction: (id: number, updatedTransaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: number) => void;
  isDarkMode: boolean;
  categories: string[];
  sources: string[];
}

const TransactionList: React.FC<Props> = ({ transactions, editTransaction, removeTransaction, isDarkMode, categories, sources }) => {
  const [filters, setFilters] = useState({
    source: '',
    category: '',
    dateFrom: '',
    dateTo: '',
  });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      (filters.source ? t.source === filters.source : true) &&
      (filters.category ? t.category === filters.category : true) &&
      (filters.dateFrom ? t.date >= filters.dateFrom : true) &&
      (filters.dateTo ? t.date <= filters.dateTo : true)
    );
  }, [transactions, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleRemove = (id: number) => {
    setConfirmDelete(id);
  };

  const confirmRemove = () => {
    if (confirmDelete !== null) {
      removeTransaction(confirmDelete);
      setConfirmDelete(null);
    }
  };

  const cancelRemove = () => {
    setConfirmDelete(null);
  };

  return (
    <div className={`transaction-list ${isDarkMode ? 'dark' : ''}`}>
      <h2>Transactions</h2>
      <div className="filters">
        <select name="source" onChange={handleFilterChange} value={filters.source}>
          <option value="">All Sources</option>
          {sources.map(source => <option key={source} value={source}>{source}</option>)}
        </select>
        <select name="category" onChange={handleFilterChange} value={filters.category}>
          <option value="">All Categories</option>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
        <input type="date" name="dateFrom" onChange={handleFilterChange} value={filters.dateFrom} />
        <input type="date" name="dateTo" onChange={handleFilterChange} value={filters.dateTo} />
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.source}</td>
              <td>
                <div className="transaction-actions">
                  <button onClick={() => editTransaction(transaction.id, transaction)}>Edit</button>
                  <button className="remove-btn" onClick={() => handleRemove(transaction.id)}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {confirmDelete !== null && (
        <div className="confirmation-popup">
          <p>Are you sure you want to remove this transaction?</p>
          <button onClick={confirmRemove}>Yes</button>
          <button onClick={cancelRemove}>No</button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;