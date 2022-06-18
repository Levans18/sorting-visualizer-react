
import { wait } from '@testing-library/user-event/dist/types/utils';
import { cp } from 'fs/promises';
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
} from '../sorting/sortingSlice';
import './Footer.css';

export function Footer() {
    const state = store.getState()
    const arrayColors = useAppSelector(selectArrayColors);
    const arrayHistory = useAppSelector(selectArrayHistory);
    const arrayColorHistory = useAppSelector(selectArrayColorHistory)
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();

    async function finishedSorting(){
        function singleColumnChange(step: number, newArrayColors: Array<string>){
            return new Promise(resolve => {
                setTimeout(() => {
                    newArrayColors[step] = "lime";
                    dispatch(colorChange(newArrayColors));
                    resolve(newArrayColors);
                }, array.length > 80 ? 1000/(array.length) : 1000/(array.length/8) );
            });
        }
        for(let i = 0; i < array.length; i++){
            let newArrayColors:Array<string> = [];
            for(let i = 0; i < array.length-1; i++){
                newArrayColors[i] = arrayColors[i];
                console.log(arrayColors.length);
            }
            await singleColumnChange(i, newArrayColors);
        }
    }

    async function bubbleSort(): Promise<void>{
        
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
    }

    async function selectionSort(){
        
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
        
        function quickSortAlgorithm(arr: Array<number>): any{
            if (arr.length <= 1) {
                return arr;
              }
            
              var pivot = arr[0];
              
              let left = []; 
              let right = [];
            
              for (let i = 1; i < arr.length; i++) {
                
                arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
              }
            
              return quickSortAlgorithm(left).concat(pivot, quickSortAlgorithm(right));
        }
        
        function quickStuff(){
            
        }


        let newArray: Array<number> = [];
        for(let i = 0; i < array.length; i++){
            newArray[i] = array[i];
        }
    
        let sorted = quickSortAlgorithm(newArray);
        dispatch(updateArray(sorted));
    }

    return(
        <footer>
            <button
                className="new-array"
                aria-label="New Array"
                onClick={() => dispatch(newArray())}
                >
                New Array
            </button>
            <div id = "array-slider">
            <label>{array.length}</label>
                <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    className="slider" 
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(sizeChange(parseInt(e.target.value)))}
                    >
                </input>
                <label>Array Size</label>
            </div>
            <div className="sorting-algorithm-buttons">
                <button
                    className="bubble-sort"
                    aria-label="Bubble Sort"
                    onClick={() => bubbleSort()}
                    >
                    Bubble Sort
                </button>
                <button
                    className="selection-sort"
                    aria-label="Selection Sort"
                    onClick={() => selectionSort()}
                    >
                    Selection Sort
                </button>
                <button
                    className="quick-sort"
                    aria-label="Quick Sort"
                    onClick={() => quickSort()}
                    >
                    Quick Sort
                </button>
                <button
                    className="merge-sort"
                    aria-label="Merge Sort"
                    onClick={() => mergeSort()}
                    >
                    Merge Sort
                </button>
            </div>
        </footer>
    );
}

export function mergeSort(){

}