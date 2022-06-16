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
        sortingSpeed: 50,
        sliderValue: 50,
        sortingTime: 0,
        arrayColors: [],
    },
    reducers: {
        newArray: (state) => {
            state.array = createArray(state.array.length);
            state.arrayColors = [];
        },

        updateArray: (state, action) => {
            state.array = action.payload;
            state.arrayColors = [];
         },

        colorChange: (state, action) => {
            state.arrayColors = action.payload;
         },
        
        sizeChange: (state, action) => {
            state.array = createArray(action.payload)
            state.arrayColors = [];
        },
        speedChange: (state, action) => {
            state.sortingSpeed = action.payload
        },
        
    }
});


export const { newArray, updateArray, colorChange, sizeChange, speedChange} = sortingSlice.actions;
export const selectArray = (state: RootState) => state.sorting.array;
export const selectSortSpeed = (state: RootState) => state.sorting.sortingSpeed;
export const selectArrayColors = (state: RootState) => state.sorting.arrayColors;
export default sortingSlice.reducer