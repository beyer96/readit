import React, { useEffect } from 'react';
import { searchForContent } from '../../features/contentReducer';
import { toggleVisibility } from '../../features/sidebarReducer';
import { useDispatch } from 'react-redux';
import './Header.css';
import searchIcon from '../../media/images/icons/search.png';
import hamburgerMenu from '../../media/images/icons/hamburger-menu.png'

export const Header = () => {
    const dispatch = useDispatch();

    const searchForContentFunc = () => {
        return (dispatch) => {
            if(window.innerWidth < 620) {
                dispatch(toggleVisibility(false));
            }
            let term = document.getElementById('search').value;
            dispatch(searchForContent(term));
        }
    }

    useEffect(() => {
        document.getElementById('search').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                dispatch(searchForContentFunc());
            }
        });
    }, [])
    
    return (
        <div className='header'>
            <div className='logo'>
                <span id='read'>READ</span>
                <span id='it'>it</span>
            </div>
            <div className='searchField'>
                <input type='text' id='search' placeholder='Search...' />
                <img onClick={() => {dispatch(searchForContentFunc())}}src={searchIcon} alt='search' />
            </div>
            <div className='hamburger' onClick={() => dispatch(toggleVisibility())}>
                <img src={hamburgerMenu} alt='hamburger menu' />
            </div>
        </div>
    )
}