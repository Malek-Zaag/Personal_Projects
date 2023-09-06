import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const counterSlice = createSlice({
    name: 'cart_Adder',
    initialState,
    reducers: {
        add: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.items.push(action.payload)
        },
        remove: (state, action) => {
            state.items.pop(action.payload)
        },
        reset: (state) => {
            state.items = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { add, remove, reset } = counterSlice.actions

export default counterSlice.reducer