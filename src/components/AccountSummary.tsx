import React from 'react';
import { Transaction } from '../App';

interface Props {
  transactions: Transaction[];
  isDarkMode: boolean;
}

const AccountSummary: React.FC<Props> = ({ transactions, isDarkMode }) => {
  const calculateBalance = (source: string) => {
    return transactions
      .filter((t) => t.source === source)
      .reduce((sum, t) => sum + (typeof t.amount === 'number' ? t.amount : 0), 0);
  };

  const sources = ['Cash (USD)', 'Zelle', 'Banco Provincial (VES)'];

  return (
    <div className={`account-summary ${isDarkMode ? 'dark' : ''}`}>
      <h2>Account Summary</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source}>
              <td>{source}</td>
              <td>${calculateBalance(source).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountSummary;