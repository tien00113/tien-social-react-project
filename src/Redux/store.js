import { applyMiddleware, legacy_createStore, combineReducers,} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { messageRuducer } from "./Message/message.reducer";

const rootReducers = combineReducers({
auth:authReducer,
post:postReducer,
message:messageRuducer
})


export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))