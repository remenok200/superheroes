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

const banUser = createAsyncThunk(
  `${SLICE_NAME}/banUser`,
  async (banData, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.banUser(banData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const unbanUser = createAsyncThunk(
  `${SLICE_NAME}/unbanUser`,
  async (userId, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await API.unbanUser({ userId });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteAllInvalidRefreshTokens = createAsyncThunk(
  `${SLICE_NAME}/deleteAllInvalidRefreshTokens`,
  async (arg, thunkAPI) => {
    try {
      await API.deleteAllInvalidRefreshTokens();
      return 0;
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

    // banUser
    builder.addCase(banUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(banUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(banUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // unbanUser
    builder.addCase(unbanUser.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(unbanUser.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(unbanUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // deleteAllInvalidRefreshTokens
    builder.addCase(deleteAllInvalidRefreshTokens.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(
      deleteAllInvalidRefreshTokens.fulfilled,
      (state, action) => {
        state.error = null;
        state.isLoading = false;
      }
    );
    builder.addCase(deleteAllInvalidRefreshTokens.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Async Thunks
export {
  loginUser,
  registerUser,
  getAllUsers,
  banUser,
  unbanUser,
  deleteAllInvalidRefreshTokens,
};

export default userSlice.reducer;
