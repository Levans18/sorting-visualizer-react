import React from 'react';
import { store } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectArray } from '../SortingArea/sorting/sortingSlice';
import { SettingsButton } from '../Components/Settings/SettingsButton';
import './Header.css';
export function Header(){
    const array = useAppSelector(selectArray);
    
    return(
        <header>
            <h1>
                Sorting Visualizer
            </h1>
            <div className="header-option-container">
                <SettingsButton/>
            </div>
        </header>
    );
}