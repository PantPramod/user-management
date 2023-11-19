
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface userState {
  value: number
}

// Define the initial state using that type
const initialState: userState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { increment, decrement, setValue } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value

export default counterSlice.reducer