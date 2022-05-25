

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { store } from '../../app/store';
import {
    newArray,
    selectArray,
} from '../sorting/sortingSlice';
import './Footer.css';

export function Footer() {
    const state = store.getState()
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();
    return(
        <footer>
            <div>
                <button
                    className="new-array"
                    aria-label="New Array"
                    onClick={() => dispatch(newArray())}
                    >
                    New Array
                </button>
            </div>
        </footer>
    );
}