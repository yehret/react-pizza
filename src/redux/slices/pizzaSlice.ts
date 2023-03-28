import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

// type FetchPizzasArgs = {
//   sortBy: string
//   order: string
//   category: string
//   search: string
//   currentPage: string
// }

// OR can use short version ( only if all elements are the same type )



// OR write this in the beginning of the fetchPizzas function
// export const fetchPizzas = createAsyncThunk<CartItem[], Record<string, string>(...

type PizzaItem = {
  id: string,
  title: string,
  price: number,
  imageUrl: string, 
  sizes: number[], 
  types: number[]
}

interface PizzaSliceState {
  items: PizzaItem[];
  status:'loading' | 'success' | 'error';
}

type FetchPizzasArgs = Record<string, string>;
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://63fcb034859df29986c23c24.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data;
});

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading', // loading, success, error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = 'error';
    });
    // [fetchPizzas.pending]: (state) => {
    //   state.status = 'loading';
    //   state.items = [];
    // },
    // [fetchPizzas.fulfilled]: (state, action) => {
    //   state.items = action.payload;
    //   state.status = 'success';
    // },
    // [fetchPizzas.rejected]: (state, action) => {
    //   state.items = [];
    //   state.status = 'error';
    // },

  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
