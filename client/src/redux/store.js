import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import movies from "./movies";
import people from "./people";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
})

export default configureStore({
    reducer: { movies, people },
    middleware: middleware,
    devTools: true
})