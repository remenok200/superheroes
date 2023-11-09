import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from 'api/superheroesApi';
import CONSTANTS from 'constants/paginate';

const SLICE_NAME = 'heroes';

const getHeroes = createAsyncThunk(
  `${SLICE_NAME}/getHeroes`,
  async (pageNumber = 0, thunkAPI) => {
    try {
      const limit = CONSTANTS.ITEMS_PER_PAGE;
      const offset = pageNumber * limit;

      const {
        data: { data: superheroes, totalHeroesCount },
      } = await API.getHeroes(limit, offset);

      return { superheroes, totalHeroesCount };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  heroes: [],
  isLoading: false,
  error: null,
  totalHeroesCount: 0,
};

const heroSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    // getHeroes
    builder.addCase(getHeroes.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(getHeroes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;

      const { superheroes, totalHeroesCount } = action.payload;
      state.heroes = superheroes;
      state.totalHeroesCount = totalHeroesCount;
    });
    builder.addCase(getHeroes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Async Thunks
export { getHeroes };

export default heroSlice.reducer;
