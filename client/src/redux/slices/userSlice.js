import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from 'api/authUserApi';

const SLICE_NAME = 'users';

const registerUser = createAsyncThunk(
  `${SLICE_NAME}/registerUser`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: { data: registeredUser },
      } = await API.registerUser(userData);
      return registeredUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const loginUser = createAsyncThunk(
  `${SLICE_NAME}/loginUser`,
  async (userData, thunkAPI) => {
    try {
      const {
        data: { data: user },
      } = await API.loginUser(userData);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllUsers = createAsyncThunk(
  `${SLICE_NAME}/getAllUsers`,
  async (arg, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.getAllUsers();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  allUsers: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    // loginUser
    builder.addCase(loginUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // registerUser
    builder.addCase(registerUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // getAllUsers
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Async Thunks
export { loginUser, registerUser, getAllUsers };

export default userSlice.reducer;
