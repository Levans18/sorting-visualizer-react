
import { wait } from '@testing-library/user-event/dist/types/utils';
import { cp } from 'fs/promises';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';
import {
    newArray,
    selectArrayColors,
    selectArray,
    selectSortSpeed,
    sizeChange,
    speedChange,
    colorChange,
    updateArray,
} from '../sorting/sortingSlice';
import './Footer.css';

export function Footer() {
    const state = store.getState()
    const sortSpeed = useAppSelector(selectSortSpeed);
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();


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
                }, 1000/(sortSpeed));
              });
        }
        let tempArray: any = [];
        for(let i = 0; i < array.length; i++){
            tempArray[i] = array[i];
        }
        for (let i = 0; i < array.length; i++) {
           await bubbleTraverseArray(tempArray, i)
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
            for (let j = 0; j < array.length - i -1; j++) {
                selectionColorUpdate(i,j);
                max = await selectionMaxFinder(arr, i, j, max);
            }
            return new Promise(resolve => {
              resolve('resolved');
            });
        }
    function selectionMaxFinder(arr:any ,i:number , j:number, max:number){
        return new Promise(resolve => {
            setTimeout(() => {
                if (arr[j] > arr[j + 1]) {
                    let tmp:any = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                    let updateArr = [...arr]
                    dispatch(updateArray(updateArr));
                }
                resolve(max);
            }, 1000/(sortSpeed));
          });
        }
        let max: any = 0;
        let tempArray: any = [];
        for(let i = 0; i < array.length; i++){
            tempArray[i] = array[i];
        }
        for (let i = 0; i < array.length; i++) {
           await selectionTraverseArray(tempArray, i)
        }
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
                    max="200" 
                    className="slider" 
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(sizeChange(parseInt(e.target.value)))}
                    >
                </input>
                <label>Array Size</label>
            </div>
            <div id = "speed-slider">
                <label>{sortSpeed}</label>
                <input 
                    type="range" 
                    min="1" 
                    max="1000" 
                    className="slider" 
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(speedChange(parseInt(e.target.value)))}
                    >
                </input>
                <label>Sorting Speed</label>
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

export function quickSort(){

}

export function mergeSort(){

}