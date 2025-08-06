import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [
    {
      id: '1',
      merchant: 'Starbucks',
      amount: 4.50,
      roundup_amount: 0.50,
      category: 'food',
      type: 'purchase',
      date: '2024-08-05T10:30:00Z',
      goal_id: '1',
      emoji: '☕',
    },
    {
      id: '2',
      merchant: 'Amazon',
      amount: 29.99,
      roundup_amount: 0.01,
      category: 'shopping',
      type: 'purchase',
      date: '2024-08-05T14:20:00Z',
      goal_id: '2',
      emoji: '📦',
    },
    {
      id: '3',
      merchant: 'Uber',
      amount: 15.75,
      roundup_amount: 0.25,
      category: 'transportation',
      type: 'purchase',
      date: '2024-08-05T18:45:00Z',
      goal_id: '1',
      emoji: '🚗',
    },
  ],
  roundupStats: {
    totalRoundups: 0.76,
    totalTransactions: 3,
    averageRoundup: 0.25,
  },
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    setRoundupStats: (state, action) => {
      state.roundupStats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setTransactions, 
  addTransaction, 
  updateTransaction, 
  deleteTransaction, 
  setRoundupStats, 
  setLoading, 
  setError 
} = transactionsSlice.actions;

export default transactionsSlice.reducer; 