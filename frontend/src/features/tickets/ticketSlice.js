import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create new ticket
export const createTicket = createAsyncThunk('ticket/create', async (ticketData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await ticketService.createTicket(ticketData, token);
	} catch (err) {
		const message =
			(err.response && err.response.data && err.response.data.message) || err.message || err.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const ticketSlice = createSlice({
	name: 'ticket',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTicket.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
