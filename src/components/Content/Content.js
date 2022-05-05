import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialLoad, selectContent, selectStatus } from '../../features/contentReducer';
import { fetchComments, componentVisible } from '../../features/linkReducer';
import { Link } from '../Link/Link';
import ReactMarkdown from 'react-markdown';

import arrowUp from '../../media/images/icons/arrow-up.png';
import arrowDown from '../../media/images/icons/arrow-down.png';
import commentBubble from '../../media/images/icons/comment-bubble.png';

import './Content.css';

export const Content = () => {
    const dispatch = useDispatch();

    const content = useSelector(selectContent);
    const status = useSelector(selectStatus); 
    
    const [showHomeButton, setShowHomeButton] = useState(false);

    const homeButton = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        dispatch(initialLoad('javascript'));
    }, [dispatch]);

    document.addEventListener('scroll', () => {
        if(window.scrollY > 200) {
            setShowHomeButton(() => true);
        }
        else {
            setShowHomeButton(() => false);
        }
    })

    const displayComments = (permalink) => {
        dispatch(componentVisible(true));
        dispatch(fetchComments(permalink));
    }

    return (
        <>
            <Link />
            <div className='content-holder'>
                {
                status.isLoading ? (<h2>Loading...</h2>) :
                status.coughtError ? (<h2>Error :( Try refreshing page...</h2>) :
                
                content && content.length > 0 ? content.map((element, i) => {
                    if(element.forAdults) {
                        return (
                        <div key={i} className='element-holder'>
                            <h2>Adult content, we don't show this stuff here, sorry...</h2>
                        </div>
                        )
                    }
                    return (
                        <div key={i} className='element-holder'>
                            <div className='left-panel'>
                                <button id='arrowUp'>
                                    <img src={arrowUp} alt='Upvote' />
                                </button>
                                <span id='upvotes'>{element.upvotes}</span>
                                <button id='arrowDown'>
                                    <img src={arrowDown} alt='Downvote' />
                                </button>
                                <button id='comments-btn' onClick={() => {displayComments(element.permalink)}}>
                                    <img src={commentBubble} alt='Show comments' />
                                    <span>{element.numComments}</span>   
                                </button>
                                
                            </div>
                            <div className='content-panel'>
                                <h2 className='title' onClick={() => {displayComments(element.permalink)}}>{element.title}</h2>
                                {element.isSelf && (<ReactMarkdown className='markdown' children={element.selftext} onClick={() => {displayComments(element.permalink)}} />)}
                                {element.isVideo && (<video src={element.media.reddit_video.fallback_url} preload={'none'} controls></video>)}
                                {!element.isSelf && !element.isVideo && (
                                    <div className='content'>
                                        <img loading='lazy' onClick={() => {displayComments(element.permalink)}} src={element.url} alt='' />
                                    </div>
                                )}
                                <p id='author'>Author: u/{element.author}</p>
                                <p id='created'>Created: {new Date(element.createdDate * 1000).toLocaleString('en-US')}</p>
                            </div>
                            
                        </div>
                    )
                }) : 
                (
                    <>
                        <h2>Nothing to display</h2>
                        <p>Use search field to get some content, or click some subreddit on the side :)</p>
                    </>
                )
                }
            </div>

            {showHomeButton ? (<button id='home-btn' onClick={homeButton}>Home</button>) : null}
        </>
    )
}