import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
}
export const counterSlice = createSlice({
    name: 'cart_Adder',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        resetCounter: (state) => {
            state.count = 0
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, resetCounter } = counterSlice.actions

export default counterSlice.reducer