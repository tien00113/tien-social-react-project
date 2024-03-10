import axios from "axios"
import { API_BASE_URL, api } from "../../config/api"
import { FOLLOw_FAILURE, FOLLOw_REQUEST, FOLLOw_SUCCESS, GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"
import userEvent from "@testing-library/user-event"

export const loginUserAction = (loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data)

        if(data.token){
            localStorage.setItem("jwt",data.token)
            
        }
console.log("login success",data)
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
        
    } catch (error) {
        console.log("--------", error)
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}


export const registerUserAction = (loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,loginData.data)

        if(data.token){
            localStorage.setItem("jwt",data.token)
            
        }
console.log("register-------",data)
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:LOGIN_FAILURE, payload:error})
    }
}


export const getProfileAction = (jwt)=>async(dispatch)=>{
    dispatch({type:GET_PROFILE_REQUEST})
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,
        {   headers:{
                "Authorization":`Bearer ${jwt}`,
            },

        });

        
console.log("profile-------",data)
        dispatch({type:GET_PROFILE_SUCCESS, payload:data})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:GET_PROFILE_FAILURE, payload:error})
    }
}


export const updateProfileAction = (reqData)=>async(dispatch)=>{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try {
        const {data} = await api.put(`${API_BASE_URL}/api/users`,
        reqData
        );

console.log("update profile-------",data)
        dispatch({type:UPDATE_PROFILE_SUCCESS, payload:data})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:UPDATE_PROFILE_FAILURE, payload:error})
    }
}

export const updateProfileImageAction = (reqData)=>async(dispatch)=>{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try {
        const {data} = await api.patch(`${API_BASE_URL}/api/users`,
        reqData
        );
                
console.log("update profile image-------",data)
        dispatch({type:UPDATE_PROFILE_SUCCESS, payload:data})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:UPDATE_PROFILE_FAILURE, payload:error})
    }
}

export const searchUser = (query)=>async(dispatch)=>{
    dispatch({type: SEARCH_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/users/search?query=${query}`);

        console.log("search user-------",data)
        dispatch({type:SEARCH_USER_SUCCESS, payload:data})

    } catch (error) {
        console.log("--------", error)
        dispatch({type:SEARCH_USER_FAILURE, payload:error})
    }
}

export const getAllUser = () => async(dispatch)=>{
    dispatch({type: GET_ALL_USERS_REQUEST});

    try {
        const {data} = await api.get(`/api/users`);
        dispatch({type: GET_ALL_USERS_SUCCESS, payload:data});
        console.log("get all users----",data);

    } catch (error) {
        console.log("error get all users",error);
        dispatch({type:GET_ALL_USERS_FAILURE, payload:error})
    }
}

export const followUser = (userId2) => async(dispatch)=>{
    dispatch({type: FOLLOw_REQUEST});

    try {
        const {data} = await api.put(`/api/users/follow/${userId2}`);
        dispatch({type: FOLLOw_SUCCESS, payload:data});
        console.log("followed----",data);

    } catch (error) {
        console.log("error follow",error);
        dispatch({type:FOLLOw_FAILURE, payload:error})
    }
}

export const logoutUserAction = () => async(dispatch)=>{
    dispatch({type: LOGOUT_REQUEST});

    try {
        const {data} = await axios.get(`${API_BASE_URL}/auth/logout`);
        dispatch({type: LOGIN_SUCCESS, payload:data});
        console.log("logout success",data);

    } catch (error) {
        console.log("error logout",error);
        dispatch({type:LOGOUT_FAILURE, payload:error})
    }
}