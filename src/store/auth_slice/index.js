import { readData } from "@/components/ui/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const check_auth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const res = await readData("/auth/checkAuth", {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    return res;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
    state.user = null;
    state.role = null;
    state.isAuthenticated = false;
    state.isLoading = false;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(check_auth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(check_auth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.role = action.payload.success ? action.payload.user?.role : null; // ✅ important
        state.isAuthenticated = action.payload.success;
         state.error = action.payload.success ? null : "User not authenticated";
      })
      .addCase(check_auth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
