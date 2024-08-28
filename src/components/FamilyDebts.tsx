import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Family Debts
      </Typography>
      <Box component="form" onSubmit={addDebt} sx={{ width: '100%', mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="From"
              value={newDebt.from}
              onChange={(e) => setNewDebt({ ...newDebt, from: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="To"
              value={newDebt.to}
              onChange={(e) => setNewDebt({ ...newDebt, to: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newDebt.amount}
              onChange={(e) => setNewDebt({ ...newDebt, amount: parseFloat(e.target.value) })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              value={newDebt.description}
              onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Add Debt
          </Button>
        </Box>
      </Box>
      <List sx={{ width: '100%' }}>
        {debts.map((debt) => (
          <ListItem key={debt.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
            <ListItemText
              primary={`${debt.from} owes ${debt.to}`}
              secondary={`$${debt.amount.toFixed(2)} - ${debt.description}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeDebt(debt.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FamilyDebts;