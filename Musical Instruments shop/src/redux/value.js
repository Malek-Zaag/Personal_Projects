import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: 'cart_Adder',
    initialState,
    reducers: {
        addvalue: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += action.payload
        },
        removevalue: (state, action) => {
            state.value -= action.payload
        },
        resetValue: (state) => {
            state.value = 0
        }
    },
})

// Action creators are generated for each case reducer function
export const { addvalue, removevalue, resetValue } = counterSlice.actions

export default counterSlice.reducer