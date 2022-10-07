import SplitButton from '../Components/mat-ui-button'
import Slider from '@mui/material/Slider'
import { useState } from 'react'
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';
import {
    newArray,
    updateArray,
    resetArray,
    selectArrayColors,
    selectArray,
    selectArrayHistory,
    selectArrayColorHistory,
    sizeChange,
    colorChange,
} from '../SortingArea/sorting/sortingSlice';
import './Footer.css';

export function Footer() {
    const state = store.getState()
    const arrayColors = useAppSelector(selectArrayColors);
    const arrayHistory = useAppSelector(selectArrayHistory);
    const arrayColorHistory = useAppSelector(selectArrayColorHistory)
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();

    const [disable, setDisable] = useState([false, false, false, false]);

    function stepTimeout(){
        return new Promise(resolve => {
            setTimeout(() => {
            resolve(null);
        }, array.length > 80 ? 1000/(array.length) : 1000/(array.length/8));
      });
    }

    async function finishedSorting(){
        function singleColumnChange(step: number, newArrayColors: Array<string>){
            return new Promise(resolve => {
                setTimeout(() => {
                    for(let i = 0; i <= array.length; i++){
                        if(i <= step){
                            newArrayColors[i] = "lime";
                        } else {
                            newArrayColors[i] = "green";
                        }
                    }
                    dispatch(colorChange(newArrayColors));
                    resolve(newArrayColors);
                },  1000/(array.length) );
            });
        }
        for(let i = 0; i < array.length; i++){
            let newArrayColors:Array<string> = [];
            for(let j = 0; j < array.length-1; j++){
                newArrayColors[j] = arrayColors[j];
            }
            await singleColumnChange(i, newArrayColors);
        }
        let purpleArray:Array<string> = [];
        for(let i = 0; i <= array.length; i++){
            purpleArray[i] = "purple";
        }
        dispatch(colorChange(purpleArray));
    }

    async function bubbleSort(): Promise<void>{
        setDisable([false, true, true, true]);
        function bubbleColorUpdate(i:number,j:number){
            let colorArr = [];
            for (let k = 0; k < i; k++){
                colorArr[array.length - 1 - k] = "green";
            }
            if(i < array.length-2){
                colorArr[j] = "red";
                colorArr[j+1] = "red"
            }else{
                colorArr[j] = "green";
                colorArr[j+1] = "green"
            }
            dispatch(colorChange(colorArr));
        }
         
        async function bubbleTraverseArray(arr:any, i:number){
                for (let j = 0; j < array.length - i -1; j++) {
                    bubbleColorUpdate(i,j);
                    await bubbleSwapValues(arr, i, j);
                }
                return new Promise(resolve => {
                  resolve('resolved');
                });
        }
        function bubbleSwapValues(arr:any ,i:number , j:number){
            return new Promise(resolve => {
                setTimeout(() => {
                    if (arr[j] > arr[j + 1]) {
                        let tmp:any = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                        let updateArr = [...arr]
                        dispatch(updateArray(updateArr));
                    }
                    resolve('resolved');
                }, array.length > 80 ? 1000/(array.length) : 1000/(array.length/4) );
              });
        }
        let newArray: any = [];
        for(let i = 0; i < array.length; i++){
            newArray[i] = array[i];
        }
        for (let i = 0; i < array.length; i++) {
           await bubbleTraverseArray(newArray, i)
        }
        finishedSorting();
    }

    async function selectionSort(){
        setDisable([true, false, true, true]);
        function selectionColorUpdate(i:number,j:number){
            let colorArr = [];
            for (let k = 0; k < i; k++){
                colorArr[array.length - 1 - k] = "green";
            }
            if(i < array.length-1){
                colorArr[j] = "red";
            }else{
                colorArr[j] = "green";
            }
            dispatch(colorChange(colorArr));
        }

        async function selectionTraverseArray(arr:any, i:number){
            let max:any;
            for (let j = 0; j < array.length - i; j++) {
                selectionColorUpdate(i,j);
                max = await selectionMaxFinder(arr, j, max);
            }
            return new Promise(resolve => {
              resolve(max);
            });
        }

        function selectionMaxFinder(arr:any, j:number, maxIndex:number){
            return new Promise(resolve => {
                setTimeout(() => {
                if (arr[j] > arr[maxIndex]) {
                    max = j;
                }
                resolve(max);
            }, array.length > 80 ? 1000/(array.length) : 1000/(array.length/8) );
          });
        }

        function selectionArrayUpdate(arr:any, maxIndex:number, step:number){
            let max:Array<number> = [];
            console.log(maxIndex);
            max = arr.splice(maxIndex, 1)
            arr.splice(arr.length-step, 0, max[0]);
            let updateArr = [...arr]
            dispatch(updateArray(updateArr));
            return(arr);
        }

        let max: any;
        let tempArray: any = [];
        for(let i = 0; i < array.length; i++){
            tempArray[i] = array[i];
        }
        for (let i = 0; i < array.length; i++) {
            max = 0;
            max = await selectionTraverseArray(tempArray, i)
            tempArray = selectionArrayUpdate(tempArray, max, i);
        }
        finishedSorting();
    }

    async function quickSort(){
        setDisable([true, true, false, true]);
        async function partition(arr: Array<number>, start:number, end:number){
            // Taking the last element as the pivot
            const pivotValue = arr[end];
            let pivotIndex = start; 
            for (let i = start; i < end; i++) {
                await stepTimeout();
                if (arr[i] < pivotValue) {
                // Swapping elements
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                // Moving to next element
                pivotIndex++;
                }
                quickColorUpdate(i,start, end)
            }
            
            // Putting the pivot value in the middle
            [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
            return new Promise(resolve => {
                 resolve(pivotIndex);
            });
        }

        async function quickSortAlgorithm(arr: Array<number>){
            // Creating an array that we'll use as a stack, using the push() and pop() functions
            let stack: Array<number> = [];
            let start: number = 0;
            let end: number = 0;
            
            // Adding the entire initial array as an "unsorted subarray"
            stack.push(0);
            stack.push(arr.length - 1);
            
            // There isn't an explicit peek() function
            // The loop repeats as long as we have unsorted subarrays
            while(stack[stack.length - 1] >= 0){
                
                // Extracting the top unsorted subarray
                end = stack.pop()!;
                start = stack.pop()!;
                let pivotIndex: any = 0;
                pivotIndex = await partition(arr, start, end);
                
                let newArray = [];
                for(let i = 0; i < array.length; i++){
                    newArray[i] = arr[i];
                }
                dispatch(updateArray(newArray));
                
                // If there are unsorted elements to the "left" of the pivot,
                // we add that subarray to the stack so we can sort it later
                if (pivotIndex - 1 > start){
                    stack.push(start);
                    stack.push(pivotIndex - 1);
                }
                
                // If there are unsorted elements to the "right" of the pivot,
                // we add that subarray to the stack so we can sort it later
                if (pivotIndex + 1 < end){
                    stack.push(pivotIndex + 1);
                    stack.push(end);
                }
            }
            quickColorUpdate(0,0,0,true);
            return arr;
            
        }

        function quickColorUpdate(step:number, start:number, end:number, finished = false){
            let colorArr: Array<string> = [];
            for(let i = 1; i + end < array.length-1; i++){
                colorArr[i+end+1] = "green";
                colorArr[i+end] = "green";
            }
            if(step < array.length-1){
                colorArr[step] = "red";
            }
            if(finished){
                for(let j = 0; j < array.length-1; j++){
                    colorArr[j] = "green"
                }
            }
            dispatch(colorChange(colorArr));
        }


        let newArray: Array<number> = [];
        for(let i = 0; i < array.length; i++){
            newArray[i] = array[i];
        }
    
        let sorted = await quickSortAlgorithm(newArray);
        dispatch(updateArray(sorted));
        finishedSorting();
    }

    async function mergeSort(){
        setDisable([true, true, true, false]);
        async function mergeSortAlgorithm(arr :Array<number>) {
        //Create two arrays for sorting
        let sorted:any = arr;
        let n = sorted.length;
        let buffer:any = [];
  
        for (let size = 1; size < n; size *= 2) {
            for (let leftStart = 0; leftStart < n; leftStart += 2*size) {
      
                //Get the two sub arrays
                let left = leftStart,
                right = Math.min(left + size, n),
                leftLimit = right,
                rightLimit = Math.min(right + size, n);
                let newArray = [];

                for(let i = 0; i < array.length; i++){
                    newArray[i] = sorted[i];
                }
                dispatch(updateArray(newArray));
                mergeColorUpdate(leftStart);
                //Merge the sub arrays
                await merge(left, right, leftLimit, rightLimit, sorted, buffer);
            }
        //Swap the sorted sub array and merge them
        let temp = sorted;
        sorted = buffer;
        buffer = temp;
        }
        return new Promise(resolve => {
            resolve(sorted);
       });

    }
        /*
         * Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr
         */
        async function merge(left:number, right:number, leftLimit:number, rightLimit:number, sorted:Array<number>, buffer:Array<number>){
            let i = left;
            
            //Compare the two sub arrays and merge them in the sorted order
            while (left < leftLimit && right < rightLimit) {
              if (sorted[left] <= sorted[right]) {
                buffer[i++] = sorted[left++];
              } else {
                buffer[i++] = sorted[right++];
              }
              let newArray = [];
              for(let i = 0; i < array.length; i++){
                newArray[i] = sorted[i];
              }
              dispatch(updateArray(newArray));
              mergeColorUpdate(i);
              await stepTimeout();
            }
          
            //If there are elements in the left sub arrray then add it to the result
            while (left < leftLimit) {
              buffer[i++] = sorted[left++];
            }
          
            //If there are elements in the right sub array then add it to the result
            while (right < rightLimit) {
              buffer[i++] = sorted[right++];
            }
        }

        function mergeColorUpdate(left:number){
            let colorArr: Array<string> = [];

            if(left < array.length-1){
                colorArr[left] = "red";
            }
            dispatch(colorChange(colorArr));
        }

        let arr: Array<number> = [];
        for(let i = 0; i < array.length; i++){
            arr[i] = array[i];
        }

        let merged = await mergeSortAlgorithm(arr);
        dispatch(updateArray(merged));
        finishedSorting();
    }
    

    return(
        <footer>
            <div className="array-modifier-container">
                <Button 
                    variant="contained"
                    className="new-array-button"
                    aria-label="New Array Button"
                    onClick={() => dispatch(newArray())}
                    >
                    New Array
                </Button>
                <div className="array-size-slider">
                    <label>{array.length}</label>
                        <input 
                            type="range" 
                            min="10" 
                            max="500" 
                            className="slider" 
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(sizeChange(parseInt(e.target.value)))}
                            >
                        </input>
                    <label>Array Size</label>
                </div>
            </div>
            <ButtonGroup className="sorting-algorithm-buttons">
                 <Button
                    disabled={disable[0]}
                    variant="contained"
                    color="info"
                    className="bubble-sort"
                    aria-label="Bubble Sort"
                    onClick={() => bubbleSort()}
                    >
                    Bubble Sort
                </Button>
                <Button
                    disabled={disable[1]}
                    variant="contained"
                    color="success"
                    className="selection-sort"
                    aria-label="Selection Sort"
                    onClick={() => selectionSort()}
                    >
                    Selection Sort
                </Button>
                <Button
                    disabled={disable[2]}
                    variant='contained'
                    color='secondary'
                    className="quick-sort"
                    aria-label="Quick Sort"
                    onClick={() => quickSort()}
                    >
                    Quick Sort
                </Button>
                <Button
                    disabled={disable[3]}
                    variant="contained"
                    color='warning'
                    className="merge-sort"
                    aria-label="Merge Sort"
                    onClick={() => mergeSort()}
                    >
                    Merge Sort
                </Button> 
            </ButtonGroup>
        </footer>
    );
}

