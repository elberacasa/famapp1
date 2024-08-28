import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AccountSummary from './components/AccountSummary';
import FamilyDebts from './components/FamilyDebts';
import ChatBot from './components/ChatBot';
import Notes from './components/Notes';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
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

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes' | 'insights'>('summary');
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
          <Container maxWidth="sm" sx={{ mt: 4 }}>
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
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;