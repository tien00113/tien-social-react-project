import { FOLLOw_REQUEST, FOLLOw_SUCCESS, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_SUCCESS, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

const initialState = {
    jwt:null,
    error:null,
    loading:false,
    user:null,
    searchUser:[],
    users:[],
    follow:null
}
export const authReducer = (state=initialState, action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
        case GET_ALL_USERS_REQUEST:
        case FOLLOw_REQUEST:
            return {...state, loading:true, error:null}
        
        case GET_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {...state, user:action.payload, error:null, loading:false}
        
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

            return {...state, jwt:action.payload, loading:false, error:null}

        case LOGOUT_SUCCESS:
            return {...state, user:null,loading:false, error:null}
        case SEARCH_USER_SUCCESS:
            return {...state, searchUser:action.payload, loading:false, error:null}
        case GET_ALL_USERS_SUCCESS:
            return {...state, users:action.payload, loading:false,error:null}
        case FOLLOw_SUCCESS:
            return {...state, follow:action.payload, loading:false, error:null}
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:

            return {...state, loading:false, error:action.payload}
        default:
            return state;
    }
}