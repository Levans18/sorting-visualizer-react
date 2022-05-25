import React, { useState } from 'react';
import { store } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    newArray,
    selectArray,
} from './sortingSlice';
import styles from './Sorting.module.css';
import './Sorting.css'


export function Sorting() {
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();

    return (
        <div className="sorting-area">
            <ul className="column-container">
                {array.map((number, index) => (
                    <li 
                    className="column" 
                    style={{height: ((window.screen.height)/array.length)*(number/1.4)+'px', width:(window.screen.width - 200) / array.length + 'px'}} 
                    key={index}>
                        {array.length < 80 ? number:null}
                    </li>
                ))}
            </ul>
        </div>
    );
}