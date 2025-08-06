import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './reducers/goalsReducer';
import transactionsReducer from './reducers/transactionsReducer';
import socialReducer from './reducers/socialReducer';

const store = configureStore({
  reducer: {
    goals: goalsReducer,
    transactions: transactionsReducer,
    social: socialReducer,
  },
});

export default store; 