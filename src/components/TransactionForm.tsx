import React, { useState, FormEvent } from 'react';
import { Transaction } from '../App';
import { Box, Button, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface Props {
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  isDarkMode: boolean;
  categories: string[];
  sources: string[];
}

const TransactionForm: React.FC<Props> = ({ addTransaction, isDarkMode, categories, sources }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');

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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              value={source}
              label="Source"
              onChange={(e) => setSource(e.target.value)}
              required
            >
              {sources.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: 200 }}
        >
          Add Transaction
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionForm;