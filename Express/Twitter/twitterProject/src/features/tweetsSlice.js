import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweets",
    initialState: [],

    reducers: {
        // Set all tweets from the server
        setTweets: (state, action) => action.payload,

        // Add new tweet from server response
        addTweet: (state, action) => {
            state.push(action.payload);
        },

        // Update tweet after PATCH
        updateTweet: (state, action) => {
            const { id, tweet } = action.payload;
            const existing = state.find((t) => t.id === id);
            if (existing) {
                existing.tweet = tweet;
                existing.isEdit = true;
            }
        },

        // Delete tweet after DELETE
        deleteTweet: (state, action) => {
            return state.filter((t) => t.id !== action.payload);
        }
    }
});

export const { setTweets, addTweet, deleteTweet, updateTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
