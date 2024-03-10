import { api } from "../../config/api"
import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_FAILURE, GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS } from "./message.actionType";


export const createMessage=(reqData)=>async(dispatch)=>{
    dispatch({type:CREATE_MESSAGE_REQUEST})
    try {
        const {data} = await api.post(`/api/messages/chat/${reqData.msg.chatId}`, reqData.msg);
        
        reqData.sendMessageToServer(data);
        console.log("created message", data);
        dispatch({type:CREATE_MESSAGE_SUCCESS, payload:data})

    } catch (error) {
        console.log("CATCH ERROR----", error)
        dispatch({
            type:CREATE_MESSAGE_FAILURE, payload:error
        })
    }
}
export const createChat=(chat)=>async(dispatch)=>{
    dispatch({type:CREATE_CHAT_REQUEST})
    try {
        const {data} = await api.post(`/api/chats`, chat);
        console.log("created chat", data);
        dispatch({type:CREATE_CHAT_SUCCESS, payload:data})

    } catch (error) {
        console.log("CATCH ERROR----", error)
        dispatch({
            type:CREATE_CHAT_FAILURE, payload:error
        })
    }
}
export const getAllChats=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_CHATS_REQUEST})
    try {
        const {data} = await api.get(`/api/chats`);
        console.log("get all chats ", data);
        dispatch({type:GET_ALL_CHATS_SUCCESS, payload:data})

    } catch (error) {
        console.log("CATCH ERROR----", error)
        dispatch({
            type:GET_ALL_CHATS_FAILURE, payload:error
        })
    }
}
