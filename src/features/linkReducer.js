import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
    'search/fetchComments',
    async (permalink) => {
        const response = await fetch('https://www.reddit.com/'+permalink+'/.json');
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)

export const linkSlice = createSlice({
    name: 'link',
    initialState: {
        componentVisible: false,
        isLoading: false,
        coughtError: false,
        link: {},
        comments: [],
        moreComments: []        // array of IDs I guess
    },
    reducers: {
        clearData: (state) => {
            state.link = {};
            state.comments = [];
            state.componentVisible = false;
        },
        componentVisible: (state, action) => {
            state.componentVisible = action.payload;
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true;
            state.coughtError = false;
        },
        [fetchComments.rejected]: (state) => {
            state.isLoading = false;
            state.coughtError = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.coughtError = false;
            const link = action.payload[0].data.children[0].data;
            state.link = {
                title: link.title,
                author: link.author,
                isVideo: link.is_video,
                createdDate: link.created,
                isSelf: link.is_self,
                url: link.url,
                permalink: link.permalink,
                selftext: link.selftext,
                media: link.media
            }
            state.comments = action.payload[1].data.children.filter(comment => comment.kind === 't1').map(comment => {
                    return ({
                        author: comment.data.author,
                        body: comment.data.body,
                        replies: comment.data.replies,
                        upvotes: comment.data.ups,
                        createdDate: comment.data.created
                    })
            });
            state.moreComments = action.payload[1].data.children.filter(comment => comment.kind === 'more');
        }
    }
})

export const { clearData, componentVisible } = linkSlice.actions;

export const selectData = state => ({
    link: state.link.link,
    comments: state.link.comments
})

export const selectStatus = state => ({
    isLoading: state.link.isLoading,
    coughtError: state.link.coughtError
})

export const selectComponentVisible = state => state.link.componentVisible;

export default linkSlice.reducer;