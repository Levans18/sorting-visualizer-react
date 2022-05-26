
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';
import {
    newArray,
    selectArray,
    sizeChange,
    bubbleSort,
    selectionSort,
    quickSort,
    mergeSort,
} from '../sorting/sortingSlice';
import './Footer.css';

export function Footer() {
    const state = store.getState()
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();
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
                max="1000" 
                className="slider" 
                >
            </input>
            <div className="sorting-algorithm-buttons">
                <button
                    className="bubble-sort"
                    aria-label="Bubble Sort"
                    onClick={() => dispatch(bubbleSort())}
                    >
                    Bubble Sort
                </button>
                <button
                    className="selection-sort"
                    aria-label="Selection Sort"
                    onClick={() => dispatch(selectionSort())}
                    >
                    Selection Sort
                </button>
                <button
                    className="quick-sort"
                    aria-label="Quick Sort"
                    onClick={() => dispatch(quickSort())}
                    >
                    Quick Sort
                </button>
                <button
                    className="merge-sort"
                    aria-label="Merge Sort"
                    onClick={() => dispatch(mergeSort())}
                    >
                    Merge Sort
                </button>
            </div>
        </footer>
    );
}