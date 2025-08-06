import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goals: [
    {
      id: '1',
      name: 'Vacation to Hawaii',
      description: 'Saving for a dream vacation to Hawaii',
      category: 'travel',
      target_amount: 5000,
      saved_amount: 3200,
      roundup_amount: 1,
      status: 'active',
      deadline: '2024-12-31',
      created_at: '2024-01-15',
      emoji: '🏝️',
    },
    {
      id: '2',
      name: 'New Laptop',
      description: 'Saving for a new MacBook Pro',
      category: 'technology',
      target_amount: 2500,
      saved_amount: 1800,
      roundup_amount: 2,
      status: 'active',
      deadline: '2024-10-15',
      created_at: '2024-02-01',
      emoji: '💻',
    },
  ],
  loading: false,
  error: null,
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    updateGoal: (state, action) => {
      const index = state.goals.findIndex(goal => goal.id === action.payload.id);
      if (index !== -1) {
        state.goals[index] = action.payload;
      }
    },
    deleteGoal: (state, action) => {
      state.goals = state.goals.filter(goal => goal.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGoals, addGoal, updateGoal, deleteGoal, setLoading, setError } = goalsSlice.actions;
export default goalsSlice.reducer; 