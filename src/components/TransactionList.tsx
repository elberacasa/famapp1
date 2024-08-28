import React from 'react';
import { Transaction } from '../App';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  transactions: Transaction[];
  editTransaction: (id: number, updatedTransaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: number) => void;
  isDarkMode: boolean;
}

const TransactionList: React.FC<Props> = ({ transactions, editTransaction, removeTransaction, isDarkMode }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <AnimatePresence>
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <Card sx={{ 
              mb: 2,
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-2px)', 
                boxShadow: 3 
              }
            }}>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <IconButton size="small" onClick={() => editTransaction(transaction.id, transaction)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => removeTransaction(transaction.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default TransactionList;