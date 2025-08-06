import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [
    { id: '1', name: 'Sarah J.', avatar: '👩‍💼', status: 'online' },
    { id: '2', name: 'Mike C.', avatar: '👨‍💻', status: 'offline' },
    { id: '3', name: 'Emma D.', avatar: '👩‍🎨', status: 'online' },
  ],
  friendRequests: [],
  groupGoals: [],
  activityFeed: [],
  loading: false,
  error: null,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
    },
    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
    },
    setGroupGoals: (state, action) => {
      state.groupGoals = action.payload;
    },
    setActivityFeed: (state, action) => {
      state.activityFeed = action.payload;
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
  setFriends, 
  addFriend, 
  removeFriend, 
  setFriendRequests, 
  setGroupGoals, 
  setActivityFeed, 
  setLoading, 
  setError 
} = socialSlice.actions;

export default socialSlice.reducer; 