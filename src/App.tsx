import React, { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AccountSummary from './components/AccountSummary';
import FamilyDebts from './components/FamilyDebts';
import ChatBot from './components/ChatBot';
import Auth from './components/Auth';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  source: string;
  date: string;
  category: string;
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<'summary' | 'form' | 'list' | 'debts' | 'chat'>('summary');
  const [categories, setCategories] = useState<string[]>(['Food', 'Transportation', 'Utilities', 'Entertainment', 'Shopping', 'Education', 'Personal Care']);
  const [sources, setSources] = useState<string[]>(['Cash (USD)', 'Zelle', 'Banco Provincial (VES)']);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Add 10 sample transactions
    const sampleTransactions: Transaction[] = [
      { id: 1, amount: 50.00, description: "Groceries", source: "Cash (USD)", date: "2023-05-01", category: "Food" },
      { id: 2, amount: 30.00, description: "Gas", source: "Zelle", date: "2023-05-02", category: "Transportation" },
      { id: 3, amount: 100.00, description: "Electricity bill", source: "Banco Provincial (VES)", date: "2023-05-03", category: "Utilities" },
      { id: 4, amount: 20.00, description: "Movie tickets", source: "Cash (USD)", date: "2023-05-04", category: "Entertainment" },
      { id: 5, amount: 75.00, description: "Dinner out", source: "Zelle", date: "2023-05-05", category: "Food" },
      { id: 6, amount: 200.00, description: "New shoes", source: "Cash (USD)", date: "2023-05-06", category: "Shopping" },
      { id: 7, amount: 15.00, description: "Book", source: "Zelle", date: "2023-05-07", category: "Education" },
      { id: 8, amount: 50.00, description: "Internet bill", source: "Banco Provincial (VES)", date: "2023-05-08", category: "Utilities" },
      { id: 9, amount: 40.00, description: "Haircut", source: "Cash (USD)", date: "2023-05-09", category: "Personal Care" },
      { id: 10, amount: 60.00, description: "Phone bill", source: "Zelle", date: "2023-05-10", category: "Utilities" }
    ];
    setTransactions(sampleTransactions);
  }, []);

  useEffect(() => {
    const auth = getAuth();
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

  const addCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  const addSource = (source: string) => {
    setSources([...sources, source]);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <header>
        <h1>FamApp</h1>
        <Auth user={user} />
        <button onClick={toggleDarkMode} className="mode-toggle">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <nav>
        <button onClick={() => setActiveComponent('summary')}>Summary</button>
        <button onClick={() => setActiveComponent('form')}>Add Transaction</button>
        <button onClick={() => setActiveComponent('list')}>Transactions</button>
        <button onClick={() => setActiveComponent('debts')}>Family Debts</button>
        <button onClick={() => setActiveComponent('chat')}>Chat Bot</button>
      </nav>
      <div className="app-container">
        <TransitionGroup>
          <CSSTransition
            key={activeComponent}
            timeout={300}
            classNames="fade"
          >
            <div className="component-container">
              {activeComponent === 'summary' && <AccountSummary transactions={transactions} isDarkMode={isDarkMode} />}
              {activeComponent === 'form' && (
                <TransactionForm 
                  addTransaction={addTransaction} 
                  isDarkMode={isDarkMode}
                  categories={categories}
                  sources={sources}
                  addCategory={addCategory}
                  addSource={addSource}
                />
              )}
              {activeComponent === 'list' && (
                <TransactionList 
                  transactions={transactions} 
                  editTransaction={editTransaction}
                  removeTransaction={removeTransaction}
                  isDarkMode={isDarkMode}
                  categories={categories}
                  sources={sources}
                />
              )}
              {activeComponent === 'debts' && <FamilyDebts isDarkMode={isDarkMode} />}
              {activeComponent === 'chat' && <ChatBot transactions={transactions} isDarkMode={isDarkMode} />}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default App;