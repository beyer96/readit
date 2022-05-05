import { loadSubreddits, selectContent, selectSidebarVisible, toggleVisibility } from "../../features/sidebarReducer";
import { fetchSubreddit } from '../../features/contentReducer';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import './Sidebar.css';

export const Sidebar = () => {
    const dispatch = useDispatch();
    
    const content = useSelector(selectContent);
    const sidebarVisible = useSelector(selectSidebarVisible);

    useEffect(() => {
        if (window.innerWidth < 620 && sidebarVisible) {
            dispatch(toggleVisibility(false));
        }
    }, []);

    useEffect(() => {
        dispatch(loadSubreddits('javascript'));
    }, [dispatch]);

    useEffect(() => {
        if(sidebarVisible) {
            document.getElementById('sidebar').style.visibility = 'visible';
        }
        else {
            document.getElementById('sidebar').style.visibility = 'hidden';
        }
    }, [sidebarVisible])

    document.body.onresize = () =>{
        if(window.innerWidth > 620 && !sidebarVisible) {
            dispatch(toggleVisibility(true));
        }
        else if (window.innerWidth < 620 && sidebarVisible) {
            dispatch(toggleVisibility(false));
        }
    }

    const fetchSubredditFunc = (link) => {
        dispatch(fetchSubreddit(link))
        if(window.innerWidth < 620) {
            dispatch(toggleVisibility(false));
        }
    }

    return (
        <div className="sidebar" id='sidebar'>
            <h2>Javascript Subreddits</h2>
            <ul>
            {content.length > 0 && content.map((element, i) => {
                return (
                    <li key={i} id='subreddit' onClick={() => fetchSubredditFunc(element.name)}><div className="icon-holder"><img src={element.icon} alt='' /></div>{element.name}</li>
                )
            })}
            </ul>
        </div>
    )
}