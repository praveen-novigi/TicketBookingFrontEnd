import { combineReducers } from "redux";
import todo from "./todo.js";
import flight from './flight.js';

export default combineReducers({todo, flight});
