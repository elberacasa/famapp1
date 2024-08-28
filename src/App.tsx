import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AccountSummary from './components/AccountSummary';
import FamilyDebts from './components/FamilyDebts';
import ChatBot from './components/ChatBot';
import Notes from './components/Notes'; // Import the new Notes component
import { auth } from './firebase'; // Import auth from firebase.ts
import { onAuthStateChanged } from 'firebase/auth';
import { Box, Container, CssBaseline, ThemeProvider, createTheme, Fade, Grow, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
// Remove the Header import
// import Header from './components/Header';

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
  const [activeComponent, setActiveComponent] = useState<'summary' | 'form' | 'list' | 'debts' | 'chat' | 'notes'>('summary');
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Add sample transactions (omitted for brevity)
  }, []);

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

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#4CAF50',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiFormGroup: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'center',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Fade in={true} timeout={500}>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {activeComponent === 'summary' && <AccountSummary transactions={transactions} isDarkMode={isDarkMode} />}
                {activeComponent === 'form' && (
                  <Grow in={true} timeout={500}>
                    <Box sx={{ width: '100%' }}>
                      <TransactionForm 
                        addTransaction={addTransaction} 
                        categories={CATEGORIES}
                        sources={SOURCES}
                        isDarkMode={isDarkMode}
                      />
                    </Box>
                  </Grow>
                )}
                {activeComponent === 'list' && (
                  <TransactionList 
                    transactions={transactions} 
                    editTransaction={editTransaction}
                    removeTransaction={removeTransaction}
                    categories={CATEGORIES}
                    sources={SOURCES}
                    isDarkMode={isDarkMode}
                  />
                )}
                {activeComponent === 'debts' && <FamilyDebts isDarkMode={isDarkMode} />}
                {activeComponent === 'chat' && <ChatBot transactions={transactions} isDarkMode={isDarkMode} />}
                {activeComponent === 'notes' && <Notes />}
              </Box>
            </Fade>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;