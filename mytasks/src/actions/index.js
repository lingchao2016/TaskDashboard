import axios from 'axios';
import { FETCH_TASKS, FETCH_TASK} from './types';

//Get All the Tasks
export const fetchTasks = () => async dispatch => {
  const res = await axios.get('http://localhost:5000/api/tasks/');
  dispatch({type: FETCH_TASKS, payload: res.data});
}

//Get one Task by Id
export const fetchTask = (taskid) => async dispatch => {
  const res = await axios.get('http://localhost:5000/api/tasks/'+taskid);
  dispatch({type: FETCH_TASK, payload: res.data});
}

//Get All the Tasks based on filter
export const filterTasks = (isCompleted, isPast, fromDate, toDate) => async dispatch => {
  const res = await axios.get('http://localhost:5000/api/tasks/?isCompleted='+isCompleted+'&isPast='+isPast+'&fromDate='+fromDate+'&toDate='+toDate);
  dispatch({type: FETCH_TASKS, payload: res.data});
}

//Create a new task
export const createTask = (values, history) => async dispatch => {

  values.completedPct = parseInt(values.completedPct);
  values.taskType = parseInt(values.taskType);
  console.log("values: "+ JSON.stringify(values));
  var headers = {
            'Content-Type': 'application/json'
  }
  const res = await axios.post('http://localhost:5000/api/tasks/', JSON.stringify(values), {headers: headers});
}

//Edit existing task by Id
export const editTask = ( values, history) => async dispatch => {
  if(values.completedPct)
    values.completedPct = parseInt(values.completedPct);
  if(values.taskType)
    values.taskType = parseInt(values.taskType);
  var taskid =values.id;
  if(taskid)
    delete values.id;
  console.log("editTask: "+ JSON.stringify(values));
  var headers = {
            'Content-Type': 'application/json'
  }
  const res = await axios.post('http://localhost:5000/api/tasks/'+taskid, JSON.stringify(values), {headers: headers});
}

//Delete a task by Id
export const deleteTask = (taskid) => async dispatch => {
  console.log("deleteTask: "+ taskid);
  const res = await axios.delete('http://localhost:5000/api/tasks/'+taskid, null);
}
