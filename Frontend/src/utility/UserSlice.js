import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backend_URL = import.meta.env.VITE_APP_BACKEND_URL;
export const isCurrentUser = createAsyncThunk("isCurrentUser",async ()=>{
try {
  // http://localhost:3100/api/v1/auth/iscurrent
    let res = await axios.get(`${backend_URL}/auth/iscurrent`,{withCredentials:true});
    return (res.data.user)
} catch (error) {
  console.log(error);
}
});

export const logOut = createAsyncThunk("logOut", async () => {
  try {
   
    let res = await axios.get(`${backend_URL}/auth/signout`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const getAllUser = createAsyncThunk("getAllUser",async ()=>{
     try {
         const res = await axios.get(`${backend_URL}/user/users`);
         return (res.data.users)
     } catch (error) {
        console.log(error)
     }
})

// Add user in Api
export const addUser = createAsyncThunk("addUser", async (user) => {
  try {
    
    const res = await axios.post(`${backend_URL}/auth/signup`, user,{withCredentials:true});
    return res.data;
  } catch (error) {
    console.log(error)
  }
});

// delete user from api

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  try {
    const res = await axios.delete(
      `${backend_URL}/user/users/${id}`,
    );
        return id
  } catch (error) {}
});

// get Single User from Api
export const getSingleUser = createAsyncThunk("getSingleUser", async (id) => {
  try {
    const res = await axios.get(`${backend_URL}/user/users/${id}`);
  
    return res.data.user;
  } catch (error) {}
});

// update user in Api
export const editUser = createAsyncThunk("editUser", async ({fd,user}) => {
    // const formObject = Object.fromEntries(fd.entries());
    // console.log(formObject,"form");
    // console.log(user);
  try {
    
    const res = await axios.patch(`${backend_URL}/user/users/${user._id}`, fd);
    return res.data.user;

  } catch (error) {}
});
const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    userList: [],
    user: {
      name: "",
      age: "",
      email: "",
      address: "",
      password: "",
      mobileNo: "",
      image: "",
      
    },
    popMessage:"",
    show: false,
    isloading: false,
    checkForm: "Add",
  },
  reducers: {
    handleShow: (state, action) => {
      state.show = true;
    },
    handleClose: (state, action) => {
      state.show = false;
    },
    handleCheckForm: (state, action) => {
      state.checkForm = action.payload;
    },
    handleUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      // {name:"",age:"",email:"",address:"",image:"",name:"rahul"}
    },
    handleemptyUser: (state, action) => {
      state.user = {
        name: "",
        age: "",
        email: "",
        address: "",
        image: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state, action) => {
        state.isloading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isloading = false;
        state.userList = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userList = [...state.userList, action.payload.data];
        state.popMessage=action.payload.message
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userList = state.userList.filter(
          (elm) => elm._id != action.payload
        );
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.user = action.payload;
        // console.log(action.payload)
      })
      .addCase(editUser.fulfilled, (state, action) => {
        let index1 = state.userList.findIndex(
          (elm) => elm._id == action.payload._id
        );
        state.userList[index1] = action.payload;
      })
      .addCase(isCurrentUser.fulfilled,(state,action)=>{
        if(action.payload){
          state.user = action.payload

        }
        
      }).addCase(logOut.fulfilled,(state,action)=>{
        state.popMessage=action.payload.message
      });
  },
});
export const {
  handleClose,
  handleShow,
  handleCheckForm,
  handleUser,
  handleemptyUser,
} = UserSlice.actions;
export default UserSlice.reducer