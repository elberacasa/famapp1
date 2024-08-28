import React, { useState } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AccountSummary from './components/AccountSummary';
import FamilyDebts from './components/FamilyDebts';
import ChatBot from './components/ChatBot';
import Notes from './components/Notes';
import FinancialInsights from './components/FinancialInsights';
import { Box, Container } from '@mui/material';
import Sidebar from './components/Sidebar';
import ThemeProvider from './components/ThemeProvider';

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  source: string;
  date: string;
  category: string;
}

const CATEGORIES = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Shopping', 'Education', 'Personal Care'];
const SOURCES = ['Cash (USD)', 'Zelle', 'Banco Provincial (VES)'];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1, amount: 120.50, description: "Grocery shopping", source: "Cash (USD)", date: "2023-05-01", category: "Food" },
  { id: 2, amount: 75.00, description: "Electricity bill", source: "Zelle", date: "2023-05-02", category: "Utilities" },
  { id: 3, amount: 45.99, description: "School books", source: "Banco Provincial (VES)", date: "2023-05-03", category: "Education" },
  { id: 4, amount: 89.99, description: "Family dinner", source: "Cash (USD)", date: "2023-05-04", category: "Food" },
  { id: 5, amount: 50.00, description: "Gas refill", source: "Zelle", date: "2023-05-05", category: "Transportation" },
  // ... add 45 more transactions here ...
  { id: 50, amount: 15.99, description: "Movie night", source: "Cash (USD)", date: "2023-05-30", category: "Entertainment" }
];

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes' | 'insights'>('summary');

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prevTransactions => [...prevTransactions, { ...transaction, id: Date.now() }]);
  };

  const editTransaction = (id: number, updatedTransaction: Omit<Transaction, 'id'>) => {
    setTransactions(prevTransactions => 
      prevTransactions.map(t => t.id === id ? { ...updatedTransaction, id } : t)
    );
  };

  const removeTransaction = (id: number) => {
    setTransactions(prevTransactions => prevTransactions.filter(t => t.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            {activeComponent === 'summary' && <AccountSummary transactions={transactions} isDarkMode={isDarkMode} />}
            {activeComponent === 'form' && (
              <TransactionForm 
                addTransaction={addTransaction} 
                categories={CATEGORIES}
                sources={SOURCES}
                isDarkMode={isDarkMode}
              />
            )}
            {activeComponent === 'list' && (
              <TransactionList 
                transactions={transactions} 
                editTransaction={editTransaction}
                removeTransaction={removeTransaction}
                isDarkMode={isDarkMode}
              />
            )}
            {activeComponent === 'debts' && <FamilyDebts isDarkMode={isDarkMode} />}
            {activeComponent === 'chat' && <ChatBot transactions={transactions} isDarkMode={isDarkMode} />}
            {activeComponent === 'notes' && <Notes />}
            {activeComponent === 'insights' && <FinancialInsights transactions={transactions} />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
