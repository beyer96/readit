import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadSubreddits = createAsyncThunk(
    'sidebar/loadSubreddits',
    async (term) => {
        const response = await fetch('https://www.reddit.com/subreddits/search.json?q='+term);
        const jsonResponse = await response.json();
        return jsonResponse;
    }
)

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        sidebarVisible: true,
        isLoading: false,
        coughtError: false,
        content: []
    },
    reducers: {
        toggleVisibility: (state, action) => {
            if(action.payload !== undefined) {
                state.sidebarVisible = action.payload;
            }
            else {
                state.sidebarVisible = !state.sidebarVisible;
            }
        }
    },
    extraReducers: {
        [loadSubreddits.pending]: (state) => {
            state.isLoading = true;
            state.coughtError = false;
        },
        [loadSubreddits.rejected]: (state) => {
            state.isLoading = false;
            state.coughtError = true;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.coughtError = false;
            state.content = action.payload.data.children.map(child => ({
                icon: child.data.icon_img,
                name: child.data.display_name_prefixed
            })
            )
        }
    }
})

export const selectContent = state => state.sidebar.content;
export const selectSidebarVisible = state => state.sidebar.sidebarVisible;

export const { toggleVisibility } = sidebarSlice.actions;


export default sidebarSlice.reducer;