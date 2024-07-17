import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../lib/API";
import { jwtDecode } from "jwt-decode";

const initialState = {
  // userId: null,
  role: null,
  token: null,
  status: "idle",
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await api.post("/user/login", userData);
      console.log("berhasil");
      return res.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.token = action.payload.token;
        state.message = "";
        const decode = jwtDecode(action.payload.token);
        state.role = decode.role;
        // console.log(decode.role);
        sessionStorage.setItem("token", action.payload.token);
        console.log("login berhasil");
      })
      .addCase(login.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.isError = action.error.message;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
