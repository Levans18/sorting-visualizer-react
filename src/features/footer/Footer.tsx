import { useState } from 'react'
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    newArray,
    updateArray,
    selectArrayColors,
    selectArray,
    sizeChange,
    colorChange,
} from '../SortingArea/sorting/sortingSlice';
import './Footer.css';
import $ from "jquery";

export function Footer() {
    const arrayColors = useAppSelector(selectArrayColors);
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();

    const [disable, setDisable] = useState([false, false, false, false]);

    /* Bubble Sort Algorithm */
    async function bubbleSort(): Promise<void>{

        /* Disable all buttons but bubble sort */
        DisableButtons("bubble-sort");

         /* Main portion of the bubble sort */
         let newArray: Array<number> = initializeArray();
         for (let i = 0; i < array.length; i++) {
             for (let j = 0; j < array.length - i -1; j++) {
                 bubbleColorUpdate(i,j);
                 await bubbleSwapValues(newArray, i, j);
                 if(isStopped() && j > 2) return;
             }
         }
         finishedSorting();

        /* Update Colors for each iteration */
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
         
        /* Check if values need to be swapped */
        function bubbleSwapValues(arr:any ,i:number , j:number){
            return new Promise(resolve => {
                setTimeout(() => {
                    if (arr[j] > arr[j + 1]) {
                        let tmp:any = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                        let updateArr = [...arr]
                        if(isStopped()) return new Promise(resolve => resolve("stopped"));
                        dispatch(updateArray(updateArr));
                    }
                    resolve('resolved');
                }, array.length >80 ? 1000/(array.length) : 1000/(array.length/4) );
              });
        }
    }

    /* Selection Sort Algorithm */
    async function selectionSort(){

        /* Disable all buttons except for selection sort */
        DisableButtons("selection-sort");

        /* Main of Selection Sort */
        let max: any;
        let newArray: Array<number> = initializeArray();
        for (let i = 0; i < array.length; i++) {
            max = 0;
            max = await selectionFindMax(newArray, i)
            newArray = selectionArrayUpdate(newArray, max, i);
        }
        finishedSorting();

        /* Update colors on each iteration */
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

        /* Find current max of the array */
        async function selectionFindMax(arr:any, i:number){
            let max:number = 0;
            for (let j = 0; j < array.length - i; j++) {
                if (arr[j] > arr[max]) {
                    max = j;
                }
                if(isStopped() && j > 2) return new Promise(resolve => resolve("stopped"));
                selectionColorUpdate(i,j);
                await stepTimeout();
            }
            return new Promise(resolve => {
              resolve(max);
            });
        }

        /* Update and Return current array */
        function selectionArrayUpdate(arr:any, maxIndex:number, step:number){
            let max:Array<number> = [];
            max = arr.splice(maxIndex, 1)
            arr.splice(arr.length-step, 0, max[0]);
            let updateArr = [...arr]
            if(isStopped()) return;
            dispatch(updateArray(updateArr));
            return(arr);
        }
    }

    /* Quick Sort Algorithm */
    async function quickSort(){

        /* Disable all buttons but quicksort */
        DisableButtons("quick-sort");

        /* Main of Quick Sort */
        let newArray: Array<number> = initializeArray();
        let sorted = await quickSortAlgorithm(newArray);
        if(isStopped()) return;
        dispatch(updateArray(sorted));
        finishedSorting();

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
                if(isStopped()) return new Promise(resolve => resolve("stopped"));
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
                if(isStopped()) return;
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

        /* Update colors when it finishes sorting a certain section */
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
    }

    /* Merge Sort Algorithm */
    async function mergeSort(){

        /*Disable all buttons but Merge Sort*/
        DisableButtons("merge-sort");

        /*Main of Merge Sort*/
        let newArray: Array<number> = initializeArray();
        let merged = await mergeSortAlgorithm(newArray);
        if(merged === "stopped") return;
        dispatch(updateArray(merged));
        finishedSorting();

        async function mergeSortAlgorithm(arr :Array<number>) {
        /* Create two arrays for sorting */
        let sorted:any = arr;
        let n = sorted.length;
        let buffer:any = [];
  
        for (let size = 1; size < n; size *= 2) {
            for (let leftStart = 0; leftStart < n; leftStart += 2*size) {
      
                /* Get the two sub arrays */
                let left = leftStart,
                right = Math.min(left + size, n),
                leftLimit = right,
                rightLimit = Math.min(right + size, n);
                let newArray = [];

                for(let i = 0; i < array.length; i++){
                    newArray[i] = sorted[i];
                }
                if(isStopped() && size > 2) return new Promise(resolve => resolve("stopped"));
                dispatch(updateArray(newArray));
                mergeColorUpdate(leftStart);
                /* Merge the sub arrays */
                await merge(left, right, leftLimit, rightLimit, sorted, buffer);
            }
        /* Swap the sorted sub array and merge them */
        let temp = sorted;
        sorted = buffer;
        buffer = temp;
        }
        return new Promise(resolve => {
            resolve(sorted);
       });

    }
        /* Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr */
        async function merge(left:number, right:number, leftLimit:number, rightLimit:number, sorted:Array<number>, buffer:Array<number>){
            let i = left;
            
            /* Compare the two sub arrays and merge them in the sorted order */
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
              if(isStopped()) return new Promise(resolve => resolve("stopped"));
              dispatch(updateArray(newArray));
              mergeColorUpdate(i);
              await stepTimeout();
            }
          
            /* If there are elements in the left sub arrray then add it to the result */
            while (left < leftLimit) {
              buffer[i++] = sorted[left++];
            }
          
            /* If there are elements in the right sub array then add it to the result */
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
    }
    
    /*Reset Buttons to not be disabled and no-click*/
    function ResetButtons(){
        setDisable([false,false,false,false]);
        let buttons:any = $(".sorting-algorithm-buttons").children();
        for(let i = 0; i < buttons.length; i++){
            if(buttons[i].classList.contains("no-click")){
                buttons[i].classList.remove("no-click");
            }
        }
        let sizeButton:any = $(".array-size-slider").children();
        sizeButton[1].classList.remove("no-click");
    }

    /*Disable the correct buttons and all buttons to no-click*/
    function DisableButtons(sortingType:String){
        switch(sortingType){
            case "bubble-sort":
                setDisable([false, true, true, true]);
                break;
            case "selection-sort":
                setDisable([true, false, true, true]);
                break;
            case "quick-sort":
                setDisable([true, true, false, true]);
                break;
            case "merge-sort":
                setDisable([true, true, true, false]);
                break;
        }
        let buttons:any = $(".sorting-algorithm-buttons").children();
        for(let i = 0; i < buttons.length; i++){
            buttons[i].classList.add("no-click");
        }
        let sizeButton:any = $(".array-size-slider").children();
        sizeButton[1].classList.add("no-click");
    }

    /*Check if the sorting has been stopped*/
    function isStopped(){
        let buttons:any = $(".sorting-algorithm-buttons").children();
        for(let i = 0; i < buttons.length; i++){
            if(buttons[i].disabled){
                return false;
            }
        }
        return true;
    }

    /*Initialize an array from state.array*/
    function initializeArray(): Array<number> {
        let newArray: Array<number> = [];
        for(let i = 0; i < array.length; i++){
            newArray[i] = array[i];
        }
        return newArray;
    }

    /*Set a timeout for a step*/
    function stepTimeout(){
        return new Promise(resolve => {
            setTimeout(() => {
            resolve(null);
        }, array.length > 80 ? 1000/(array.length) : 1000/(array.length/8));
      });
    }

    /*Function for the after sorting visual*/
    async function finishedSorting(){
        
        /*Main of Finished Sorting*/
        for(let i = 0; i < array.length; i++){
            let newArrayColors:Array<string> = [];
            for(let j = 0; j < array.length-1; j++){
                newArrayColors[j] = arrayColors[j];
            }
            if(isStopped()) return;
            await singleColumnChange(i, newArrayColors);
        }
        
        /*When finished set array to purple*/
        let purpleArray:Array<string> = [];
        for(let i = 0; i <= array.length; i++){
            purpleArray[i] = "purple";
        }
        dispatch(colorChange(purpleArray));

        /*Change the color of a single column*/
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
                    if(isStopped()) return new Promise(resolve => resolve("stopped"));
                    dispatch(colorChange(newArrayColors));
                    resolve(newArrayColors);
                },  1000/(array.length) );
            });
        }
    }

    return(
        <footer>
            <div className="array-modifier-container">
                <Button 
                    variant="contained"
                    className="new-array-button"
                    aria-label="New Array Button"
                    onClick={() => {ResetButtons(); dispatch(newArray())}}
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

