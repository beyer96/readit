import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const setLimit = () => {
    if(window.innerWidth < 620) {
        return 50;
    }
    return 100;
}

export const initialLoad = createAsyncThunk(
    'content/initialLoad',
    async (term) => {
        const response = await fetch('https://www.reddit.com/search.json?q='+term+'&limit=20');
        const jsonResponse = await response.json();
        return jsonResponse.data.children;
    }
)

export const searchForContent = createAsyncThunk(
    'content/searchForContent',
    async (term) => {
        const limit = setLimit();
        const response = await fetch('https://www.reddit.com/search.json?q='+term+'&limit='+limit);
        const jsonResponse = await response.json();
        return jsonResponse.data.children;
    }
)

export const fetchSubreddit = createAsyncThunk(
    'content/fetchSubreddit',
    async (subreddit) => {
        const response = await fetch('https://www.reddit.com/'+subreddit+'/.json');
        const jsonResponse = await response.json();
        return jsonResponse.data.children;
    }
)

export const contentSlice = createSlice({
    name: 'content',
    initialState: {
        isLoading: false,
        coughtError: false,
        content: []
    },
    reducers: {

    },
    extraReducers: {
        [initialLoad.pending]: (state) => {
            state.isLoading = true;
            state.coughtError = false;
        },
        [initialLoad.rejected]: (state) => {
            state.isLoading = false;
            state.coughtError = true;
        },
        [initialLoad.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.coughtError = false;
            state.content = action.payload.map(child => ({
                    title: child.data.title,
                    author: child.data.author,
                    upvotes: child.data.ups,
                    isVideo: child.data.is_video,
                    numComments: child.data.num_comments,
                    createdDate: child.data.created,
                    isSelf: child.data.is_self,
                    url: child.data.url,
                    forAdults: child.data.over_18,
                    permalink: child.data.permalink,
                    selftext: child.data.selftext,
                    media: child.data.media
            }))
        },
        [searchForContent.pending]: (state) => {
            state.isLoading = true;
            state.coughtError = false;
        },
        [searchForContent.rejected]: (state) => {
            state.isLoading = false;
            state.coughtError = true;
        },
        [searchForContent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.coughtError = false;
            state.content = action.payload.map(child => ({
                title: child.data.title,
                author: child.data.author,
                upvotes: child.data.ups,
                isVideo: child.data.is_video,
                numComments: child.data.num_comments,
                createdDate: child.data.created,
                isSelf: child.data.is_self,
                url: child.data.url,
                forAdults: child.data.over_18,
                permalink: child.data.permalink,
                selftext: child.data.selftext,
                media: child.data.media
            }))
        },
        [fetchSubreddit.pending]: (state) => {
            state.isLoading = true;
            state.coughtError = false;
        },
        [fetchSubreddit.rejected]: (state) => {
            state.isLoading = false;
            state.coughtError = true;
        },
        [fetchSubreddit.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.coughtError = false;
            state.content = action.payload.map(child => ({
                title: child.data.title,
                author: child.data.author,
                upvotes: child.data.ups,
                isVideo: child.data.is_video,
                numComments: child.data.num_comments,
                createdDate: child.data.created,
                isSelf: child.data.is_self,
                url: child.data.url,
                forAdults: child.data.over_18,
                permalink: child.data.permalink,
                selftext: child.data.selftext,
                media: child.data.media
            }));
        }
    }
})

export const selectContent = state => state.content.content;
export const selectStatus = state => ({
    isLoading: state.content.isLoading, 
    coughtError: state.content.coughtError
});

export default contentSlice.reducer;