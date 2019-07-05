import {combineReducers} from 'redux';
import { FETCH_TASKS, FETCH_TASK } from '../actions/types';

export default combineReducers({
  tasks: function(state = [], action){
    switch(action.type){
      case FETCH_TASKS:
        return action.payload;
      default:
        return state;
    }
  },
  task: function(state = [], action){
    switch(action.type){
      case FETCH_TASK:
        return action.payload;
      default:
        return state;
    }
  }
})
