import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';

export interface SortingState {
    array: Array<number>;
    arrayColors: Array<string>;
    sortingSpeed: number;
    arrayHistory: Array<Array<number>>;
    arrayColorHistory: Array<Array<string>>;
    sortingTime: number;
}

function createArray(max: number){
    let arr = []
    let num = 0;
    for(let i = 0; i < max; i++){
        num = Math.floor(Math.random() * (max - 2)) + 1;
        arr.push(num);
    }
    return arr;
}

export const sortingSlice = createSlice({
    name: 'sorting',
    initialState: {
        array: createArray(50),
        sliderValue: 50,
        sortingTime: 0,
        arrayColors: [],
        arrayHistory: [],
        arrayColorHistory: [],
    },
    reducers: {
        newArray: (state) => {
            state.array = createArray(state.array.length);
            state.arrayColors = [];
        },

        updateArray: (state, action) => {
            state.array = action.payload;
         },

        resetArray: (state) => {
            state.array = state.arrayHistory[0];
        },

        colorChange: (state, action) => {
            state.arrayColors = action.payload;
         },
        
        sizeChange: (state, action) => {
            state.array = createArray(action.payload)

        },
    }
});


export const { newArray, updateArray, colorChange, sizeChange, resetArray} = sortingSlice.actions;
export const selectArray = (state: RootState) => state.sorting.array;
export const selectArrayColors = (state: RootState) => state.sorting.arrayColors;
export const selectArrayHistory = (state: RootState) => state.sorting.arrayHistory;
export const selectArrayColorHistory = (state: RootState) => state.sorting.arrayColorHistory;
export default sortingSlice.reducer