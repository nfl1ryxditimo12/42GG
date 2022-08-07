import { combineReducers } from "redux";
import profile from "./profile";
import user from "./user";

const rootReducer = combineReducers({
    profile,
    user
});

export default rootReducer;