import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';

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

function animateSorting(arrayOfArrays: any, state: any){
}

export const sortingSlice = createSlice({
    name: 'sorting',
    initialState: {
        array: createArray(100),
        arraySize: 100,
        sliderValue: 100,
    },
    reducers: {
        newArray: (state) => {
            state.array = createArray(state.arraySize);
        },

        sizeChange: (state, action) => {
            state.array = createArray(action.payload)
        },

        updateArray: (state, action) => {
            state.array = action.payload;
         },
    }
});


export const { newArray, sizeChange, updateArray} = sortingSlice.actions;
export const selectArray = (state: RootState) => state.sorting.array;
export const selectArraySize = (state: RootState) => state.sorting.array;
export default sortingSlice.reducer