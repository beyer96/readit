import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "../features/contentReducer";
import linkReducer from "../features/linkReducer";
import sidebarReducer from "../features/sidebarReducer";

export default configureStore({
    reducer: {
        content: contentReducer,
        sidebar: sidebarReducer,
        link: linkReducer
    }
})