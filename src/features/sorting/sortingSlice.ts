import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SortingState {
    array: Array<number>
    arraySize: number;
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
        array: createArray(25),
        arraySize: 25,
    },
    reducers: {
        newArray: (state) => {
            state.array = createArray(state.arraySize);
        },

        sizeChange: (state) => {
            
        },

        bubbleSort: (state) => {

        },

        selectionSort: (state) => {

        },

        quickSort: (state) => {

        },

        mergeSort: (state) => {

        },


    }
});


export const { newArray, sizeChange, bubbleSort, selectionSort, quickSort, mergeSort } = sortingSlice.actions;
export const selectArray = (state: RootState) => state.sorting.array;
export const selectArraySize = (state: RootState) => state.sorting.array;
export default sortingSlice.reducer