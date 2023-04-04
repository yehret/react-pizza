import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaItem, PizzaSliceState, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, // loading, success, error
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
      state.status =  Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status =  Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status =  Status.ERROR;
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


export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
