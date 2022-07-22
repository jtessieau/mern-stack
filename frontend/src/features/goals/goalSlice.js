import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

// Create a new goal

export const createGoal = createAsyncThunk('goal/create', async (goalData, ThunkAPI) =>{
    try {
        const token = ThunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },

    extraReducers:(builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = goalSlice.actions

export default goalSlice.reducer