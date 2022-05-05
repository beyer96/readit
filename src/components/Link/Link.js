import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearData, selectData, selectComponentVisible, selectStatus } from '../../features/linkReducer';
import ReactMarkdown from 'react-markdown';
import './Link.css';


export const Link = () => {

    const dispatch = useDispatch();
    const {link, comments} = useSelector(selectData);
    const status = useSelector(selectStatus);
    const componentVisible = useSelector(selectComponentVisible);


    const close = () => {
        dispatch(clearData());
    }

    useEffect(() => {
        if(!componentVisible) {
            document.getElementsByClassName('background-blur')[0].style.visibility = 'hidden';
            document.getElementsByClassName('link-holder')[0].style.visibility = 'hidden';   
        }
        else {
            document.getElementsByClassName('background-blur')[0].style.visibility = 'visible';
            document.getElementsByClassName('link-holder')[0].style.visibility = 'visible';   
        }
        
    }, [componentVisible])
    
    return (
        <>
            <div className='background-blur' onClick={() => {close();}}></div>
            <div className="link-holder">
                <button id='close-btn' onClick={() => {close();}}>X</button>
                {
                status.isLoading ? (<h2>Loading...</h2>) : 
                status.coughtError ? (<h2>Error :( Try refreshing page...</h2>) : (
                <>  
                    <div className='content-panel'>
                        <h2>{link.title}</h2>
                        <span id='warning'>Content doesn't display correctly? You can see it directly on Reddit clicking <a href={'http://www.reddit.com'+link.permalink} rel='noreferrer' target='_blank'>this link</a></span>
                        {link.isSelf && (<ReactMarkdown children={link.selftext} />)}
                        {link.isVideo && (<video src={link.media.reddit_video.fallback_url} preload={'none'} controls></video>)}
                        {!link.isSelf && !link.isVideo && (
                            <div className='content'>
                                <img loading='lazy' src={link.url} alt='' />
                            </div>
                        )}
                        <p id='author'>Author: u/{link.author}</p>
                        <p id='created'>Created: {new Date(link.createdDate * 1000).toLocaleString('en-US')}</p>
                    </div>

                    <div className='comments-holder'>
                        <h2>Comments:</h2>
                        {comments && comments.map((comment, i) => {
                            return (
                                <div key={i} className='comment'>
                                    <h3 className='comment-author'>{comment.author}</h3>
                                    <span className='comment-date'>{new Date(comment.createdDate * 1000).toLocaleString('en-US')}</span>
                                    <ReactMarkdown children={comment.body} />
                                </div>
                            )
                        })}
                    </div>
                </>
                )
                }
                
                            
            </div>
        </>
    )
}