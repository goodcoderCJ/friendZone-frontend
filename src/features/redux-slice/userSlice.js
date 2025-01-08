import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../api-services/userService";


// initializing the initial state of the user
const localUser = JSON.parse(localStorage.getItem("user"));
const initialstate = {
  user: localUser ? localUser : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  allUsers: [],
  eachUser: {},
};

// creating the async thunk functions to handle the api requests as gotten from the userService
export const createUser = createAsyncThunk(
  "api-services/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await userService.createUser(userData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listUsers = createAsyncThunk(
  "api-services/listUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      const response = await userService.listUsers(token);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  "api-services/getUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await userService.getUser(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "api-services/updateUser",
  async ( id, userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await userService.updateUser(id, userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "api-services/deleteUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token;
      return await userService.deleteUser(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const signIn= createAsyncThunk("api-services/signIn", async (userData, thunkAPI) => {
  try {
    const response = await userService.signIn(userData);
    return response;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const signOut =createAsyncThunk("api-services/signOut", async(_, thunkAPI) => {
  try {
    const response = await userService.signOut();
    return response;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})


// creating the userSlice to handle the state of the user
export const userSlice = createSlice({
  name: "user",
  initialState: initialstate,
  reducers: {
    reset: (state) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(listUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listUsers.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.allUsers=action.payload;
       
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.eachUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateUser.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const {_id, name } = action.payload;
        const foundUser = state.allUsers.find(user => user._id === _id);
        if(foundUser){
          foundUser.name = name;
        }
       
      
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state,action) => {
        state.user = null;
        state.isSuccess = true;
        const foundUser = state.allUsers.find(user => user._id === action.payload._id);
        if(foundUser){
          state.allUsers = state.allUsers.filter(user => user._id !== action.payload._id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      }).addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      }).addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
      }).addCase(signIn.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      }).addCase(signOut.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      }).addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "";
      }).addCase(signOut.rejected, (state, action) => {
      
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// exporting the actions to be used in the components
export const { reset } = userSlice.actions;


// exporting the reducer to be used in the store
export default userSlice.reducer;
