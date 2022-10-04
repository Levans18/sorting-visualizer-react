import React, { useState } from 'react';
import { store } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    newArray,
    selectArray,
    selectArrayColors,
} from './sortingSlice';
import './Sorting.css'


export function Sorting() {
    const array = useAppSelector(selectArray);
    const dispatch = useAppDispatch();
    const arrayColors = useAppSelector(selectArrayColors);

    return (
        <div className="sorting-area">
            <ul className="column-container" id="column-container">
                {array.map((number, index) => (
                    <li 
                    className="column" 
                    style={{backgroundColor: arrayColors[index] != null ? arrayColors[index] : "lightskyblue" ,height: "calc(98%/"+array.length+"*"+number+"", width:(window.screen.width - 200) / array.length + 'px'}} 
                    key={index}>
                        {array.length < 80 ? number:null}
                    </li>
                ))}
            </ul>
        </div>
    );
}