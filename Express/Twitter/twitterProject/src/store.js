import { configureStore } from "@reduxjs/toolkit";
import tweetReducer from "./features/tweetsSlice";

export const store = configureStore({
    reducer: {
        tweets: tweetReducer
    },
});
