import React, { useState, useMemo } from 'react';
import { Transaction } from '../App';
import { Box, Card, CardContent, CardActions, Typography, Button, Grid, Select, MenuItem, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectChangeEvent } from '@mui/material/Select';

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

  const handleFilterChange = (e: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
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

  const handleEdit = (transaction: Transaction) => {
    // You might want to implement an edit form or modal here
    console.log('Edit transaction:', transaction);
    // For now, let's just log the transaction. You can implement the actual edit functionality later.
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            fullWidth
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            displayEmpty
          >
            <MenuItem value="">All Sources</MenuItem>
            {sources.map(source => <MenuItem key={source} value={source}>{source}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Select
            fullWidth
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            displayEmpty
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            name="dateFrom"
            label="From"
            InputLabelProps={{ shrink: true }}
            value={filters.dateFrom}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            name="dateTo"
            label="To"
            InputLabelProps={{ shrink: true }}
            value={filters.dateTo}
            onChange={handleFilterChange}
          />
        </Grid>
      </Grid>
      {filteredTransactions.map((transaction) => (
        <Card key={transaction.id} sx={{ mb: 2, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
          <CardContent>
            <Typography variant="h6">{transaction.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              Amount: ${transaction.amount.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {transaction.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {transaction.date}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <IconButton size="small" onClick={() => handleEdit(transaction)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => handleRemove(transaction.id)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
      <Dialog
        open={confirmDelete !== null}
        onClose={cancelRemove}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this transaction?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelRemove}>Cancel</Button>
          <Button onClick={confirmRemove} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionList;