import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks:[],
  loading:true,
  error:null
}

// Asynchronous thunk to fetch data
export const fetchPostsData = createAsyncThunk(
    'data/fetchPostsData',
    async (data, { rejectWithValue }) => {
      try {
        // const response = await axios.get(url);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching data');
      }
    }
  );

export const getPostsSlice = createSlice({
  name: 'getAllPosts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsData.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchPostsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

})

// Action creators are generated for each case reducer function
export const {  } = getPostsSlice.actions

export default getPostsSlice.reducer