
import { wait } from '@testing-library/user-event/dist/types/utils';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';
import {
    newArray,
    selectArray,
    sizeChange,
    updateArray,
} from '../sorting/sortingSlice';
import './Footer.css';

export function Footer() {
    const state = store.getState()
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();

    function bubbleSort(){
        let screenColumns = document.getElementsByClassName("column");

        let tempArray: any = [];
        for(let i = 0; i < array.length; i++){
            tempArray[i] = array[i];
        }
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (tempArray[j] > tempArray[j + 1]) {
                    let tmp:any = tempArray[j];
                    tempArray[j] = tempArray[j + 1];
                    tempArray[j + 1] = tmp;
                    let updateArr = [...tempArray]
                    setTimeout(() => {
                        dispatch(updateArray(updateArr))
                    }, 2000)
                }
            }
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
            <input 
                type="range" 
                min="10" 
                max="200" 
                className="slider" 
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(sizeChange(parseInt(e.target.value)))}
                >
            </input>
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


export function selectionSort(){

}

export function quickSort(){

}

export function mergeSort(){

}