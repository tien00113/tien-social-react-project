import { type } from "@testing-library/user-event/dist/type";
import { api } from "../../config/api";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_SAVED_POST_FAILURE, GET_SAVED_POST_REQUEST, GET_SAVED_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SAVED_POST_FAILURE, SAVED_POST_REQUEST, SAVED_POST_SUCCESS } from "./post.actionType"

export const createPostAction = (postData)=>async(dispatch)=>{
    dispatch({type:CREATE_POST_REQUEST});
    try {
        const {data} = await api.post('/api/posts', postData);
        dispatch({type:CREATE_POST_SUCCESS, payload:data});
        console.log("create post-----",data);
    } catch (error) {
        console.log("error----", error);
        dispatch({type:CREATE_POST_FAILURE, payload:error});
    }
};

export const getAllPostAction = ()=>async(dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST});
    try {
        const {data} = await api.get(`/api/posts`);
        dispatch({type:GET_ALL_POST_SUCCESS, payload:data});
        console.log("get all post-----",data);
    } catch (error) {
        console.log("error----", error);
        dispatch({type:GET_ALL_POST_FAILURE, payload:error});
    }
};
export const getUsersPostAction = (userId)=>async(dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST});
    try {
        const {data} = await api.get(`/api/posts/user/${userId}`);
        dispatch({type:GET_USERS_POST_SUCCESS, payload:data});
        console.log("get users post-----",data);
    } catch (error) {
        console.log("error----", error);
        dispatch({type:GET_USERS_POST_FAILURE, payload:error});
    }
};
export const likePostAction = (postId)=>async(dispatch)=>{
    dispatch({type:LIKE_POST_REQUEST});
    try {
        const {data} = await api.put(`/api/posts/like/${postId}`);
        dispatch({type:LIKE_POST_SUCCESS, payload:data});
        console.log("like post-----",data);
    } catch (error) {
        console.log("error----", error);
        dispatch({type:LIKE_POST_FAILURE, payload:error});
    }
};

export const createCommentAction = (reqData)=>async(dispatch)=>{
    dispatch({type:CREATE_COMMENT_REQUEST});
    try {
        const {data} = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data);
        dispatch({type:CREATE_COMMENT_SUCCESS, payload:data});
        console.log("create cmt-----",data);
    } catch (error) {
        console.log("error----", error);
        dispatch({type:CREATE_COMMENT_FAILURE, payload:error});
    }
};

export const savedPostAction = (postId)=>async(dispatch)=>{
    dispatch({type: SAVED_POST_REQUEST});
    try {
        const {data} = await api.put(`/api/posts/save/${postId}`);
        dispatch({type: SAVED_POST_SUCCESS, payload:data});
        console.log("saved post--------------",data);
    } catch (error) {
        console.log("error saved post   ", error);
        dispatch({type: SAVED_POST_FAILURE, payload:error})
    }
}
export const getSavedPostAction = (userId)=>async(dispatch)=>{
    dispatch({type: GET_SAVED_POST_REQUEST});
    try {
        const {data} = await api.get(`/api/users/${userId}/savedPosts`);
        dispatch({type: GET_SAVED_POST_SUCCESS, payload:data});
        console.log("get saved post--------------",data);
    } catch (error) {
        console.log("error get saved post   ", error);
        dispatch({type: GET_SAVED_POST_FAILURE, payload:error})
    }
}


export const deletePostAction = (postId)=>async(dispatch)=>{
    dispatch({type: DELETE_POST_REQUEST});
    try {
        const {data} = await api.delete(`/api/posts/${postId}`);
        dispatch({type: DELETE_POST_SUCCESS, payload:data});
        console.log("deleted post--------------",data);
    } catch (error) {
        console.log("error deleted post   ", error);
        dispatch({type: DELETE_POST_FAILURE, payload:error})
    }
}

export const deleteCommentAction = (postId, commentId)=>async(dispatch)=>{
    dispatch({type: DELETE_COMMENT_REQUEST});
    try {
        const {data} = await api.delete(`/api/posts/${postId}/comments/${commentId}`);
        dispatch({type: DELETE_COMMENT_SUCCESS, payload:{data,postId,commentId}});
        console.log("deleted comment--------------",commentId);
    } catch (error) {
        console.log("error delete comment   ", error);
        dispatch({type: DELETE_COMMENT_FAILURE, payload:error})
    }
}
