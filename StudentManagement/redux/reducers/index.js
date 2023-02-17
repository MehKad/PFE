import { combineReducers } from "redux";

import { user } from "./user";

const Reducer = combineReducers({ userState: user });

export default Reducer;