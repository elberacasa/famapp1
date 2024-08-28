import React from 'react';
import { Transaction } from '../App';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Box, Typography, Grid } from '@mui/material';

interface Props {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const FinancialInsights: React.FC<Props> = ({ transactions }) => {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  const monthlyTotals = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(monthlyTotals).map(([name, value]) => ({ name, value }));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Financial Insights</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Spending by Category</Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Monthly Spending</Typography>
          <BarChart width={400} height={400} data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialInsights;