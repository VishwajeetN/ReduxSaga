import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'

//// Import the below actions when we use SliceReducer approach.
import {updateName, updateAge} from '../redux/reducer'

const getUserName = async () =>{
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await res.json();
    //return result[0].name // Return first name element form array objects.
    return result [Math.floor(Math.random() * 11 )].name;
}

//// worker Saga aka Generator Function: will be fired on UPDATE_NAME actions.
function* fetchUser(action) {
  try {
    // const userName = yield getUserName(); // Pause the execution of a function until getUserName() fetched complete data.
    // // We can also call the above funtion by using call effect is as below.
    // // We can passed the argument also as second argument like yield call (getUserName, userId) etc
    const userName = yield call (getUserName); // Pause the execution of a function until getUserName() fetched complete data.

    //// The below type and payload object will be use when we use createReducer approach.
    //// put effects dispatch the action (UPDATE_NAME_SUCCESS) under worker Saga function.
    // // yield put({type:'UPDATE_NAME_SUCCESS', payload: userName})  

    //// The below updateName-action will be use when we use SliceReducer approach.
    yield put(updateName(userName))  // put effects dispatch the action (UPDATE_NAME_SUCCESS) under worker Saga function.
    // const user = yield call(Api.fetchUser, action.payload.userId)
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
    console.log(e);
  }
}

//// worker Saga aka Generator Function: will be fired on UPDATE_AGE actions.
function* changeAge(){
  yield delay(2000); //We intentionally delay the execution for 2 sec, hence we use yield. 
  //// The below type and payload object will be use when we use createReducer approach.
  // // yield put({type:'UPDATE_AGE_SUCCESS', Payload: 40})

   //// The below updateAge - action will be use when we use SliceReducer approach.
  yield put(updateAge(43))
}


/*
  Starts fetchUser on each dispatched `UPDATE_NAME` action.
  Allows concurrent fetches of user.
*/

////yield behaves like await keyword (userSaga represent a watcher saga) 
// function* userSaga() {
//     yield takeEvery('UPDATE_NAME', fetchUser)
//   }

  /*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "UPDATE_NAME" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
//// yield behaves like await keyword (userSaga represent a watcher saga) 
function* userSaga() {
    yield takeLatest('UPDATE_NAME', fetchUser)
    yield takeEvery('UPDATE_AGE', changeAge)
  }
  
   export default userSaga