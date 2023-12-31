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

      const lastPageNumber = Math.ceil(
        totalHeroesCount / CONSTANTS.ITEMS_PER_PAGE
      );

      return { superheroes, totalHeroesCount, lastPageNumber };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteHero = createAsyncThunk(
  `${SLICE_NAME}/deleteHero`,
  async (heroId, thunkAPI) => {
    try {
      await API.deleteHero(heroId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deletePower = createAsyncThunk(
  `${SLICE_NAME}/deletePower`,
  async ({ heroId, powerId }, thunkAPI) => {
    try {
      await API.deletePower(heroId, powerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addPower = createAsyncThunk(
  `${SLICE_NAME}/addPower`,
  async ({ heroId, powerName }, thunkAPI) => {
    try {
      await API.addPower(heroId, powerName);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const editHero = createAsyncThunk(
  `${SLICE_NAME}/editHero`,
  async ({ heroId, updates }, thunkAPI) => {
    try {
      await API.editHero(heroId, updates);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteImage = createAsyncThunk(
  `${SLICE_NAME}/deleteImage`,
  async ({ heroId, imageId }, thunkAPI) => {
    try {
      await API.deleteImage(heroId, imageId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addImage = createAsyncThunk(
  `${SLICE_NAME}/addImage`,
  async ({ heroId, formData }, thunkAPI) => {
    try {
      await API.addImage(heroId, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addHero = createAsyncThunk(
  `${SLICE_NAME}/addHero`,
  async (hero, thunkAPI) => {
    try {
      await API.addHero(hero);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const createRandomHero = createAsyncThunk(
  `${SLICE_NAME}/createRandomHero`,
  async (arg, thunkAPI) => {
    try {
      await API.createRandomHero();
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
  lastPageNumber: 0,
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

      const { superheroes, totalHeroesCount, lastPageNumber } = action.payload;
      state.heroes = superheroes;
      state.totalHeroesCount = totalHeroesCount;
      state.lastPageNumber = lastPageNumber;
    });
    builder.addCase(getHeroes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // deleteHero
    builder.addCase(deleteHero.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(deleteHero.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteHero.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // deletePower
    builder.addCase(deletePower.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(deletePower.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deletePower.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addPower
    builder.addCase(addPower.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(addPower.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addPower.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // editHero
    builder.addCase(editHero.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(editHero.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(editHero.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // deleteImage
    builder.addCase(deleteImage.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addImage
    builder.addCase(addImage.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(addImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // addHero
    builder.addCase(addHero.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(addHero.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addHero.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // createRandomHero
    builder.addCase(createRandomHero.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(createRandomHero.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createRandomHero.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Async Thunks
export {
  getHeroes,
  deleteHero,
  deletePower,
  addPower,
  editHero,
  deleteImage,
  addImage,
  addHero,
  createRandomHero,
};

export default heroSlice.reducer;
