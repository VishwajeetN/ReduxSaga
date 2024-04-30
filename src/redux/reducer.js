import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'Vishwajit',
    age: 38,
    joke: 'hahaaa'
}

//// Approach - 1 (Using createReducer reducer)
//// createReducer is an alternative for slice reducer.
//// With createReducer we can directly update the state without using switch / If-else statement. 
/// Also we don't need to create the copy of state or use spread operator and directly use the state
//// createReducer does not related to saga. Its related to Redux Tool Kit (RTK)
/*
const userReducer = createReducer(initialState, (builder) => {
    builder.addCase('UPDATE_NAME_SUCCESS', (state, action) => {
        state.name = action.payload
    })
    builder.addCase('UPDATE_AGE_SUCCESS', (state, action) => {
        state.age = action.payload
    })
    builder.addCase('JOKE_SUCCESS', (state, action) => {
        state.joke = action.payload
    })
})
*/

//// Approach - 2 (Using createSlice Reducer)
//// Create reducer using createSlice reducer.

const userReducer = createSlice({
    name: 'myApp',
    initialState,
    reducers: {
        updateName(state, action) {
            state.name = action.payload
        },
        updateAge(state, action) {
            state.age = action.payload
        },
        updateJoke(state, action) {
            state.joke = action.payload
        }
    }
})

//// This below export statment will use when we used createReducer apporach.
////export default userReducer;

//// This below export statment will use when we used SliceReducer apporach.
export default userReducer.reducer
//// Export the actions when we use SliceReducer apporach.
export const { updateName, updateAge, updateJoke } = userReducer.actions