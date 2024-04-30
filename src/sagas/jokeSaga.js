import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'

//// Import the below actions when we use SliceReducer approach.
import {updateJoke} from '../redux/reducer'

const fetchJoke  = async () =>{
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const result = await res.json();
    //return result[0].name // Return first name element form array objects.
    console.log(result);
    return result.value;
}

//// worker Saga aka Generator Function: will be fired on GET_JOKE actions.
function* getJoke() {
  // try {
  //   // const userName = yield getUserName(); // Pause the execution of a function until getUserName() fetched complete data.
  //   // // We can also call the above funtion by using call effect is as below.
  //   // // We can passed the argument also as second argument like yield call (getUserName, userId) etc
  //   const userName = yield call (getUserName); // Pause the execution of a function until getUserName() fetched complete data.
  //// put effects dispatch the action (UPDATE_NAME_SUCCESS) under worker Saga function.
  //   yield put({type:'UPDATE_NAME_SUCCESS', payload: userName})  

  //   // const user = yield call(Api.fetchUser, action.payload.userId)
  //   // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  // } catch (e) {
  //   // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  //   console.log(e);
  // }
  const joke = yield fetchJoke();

  //// The below type and payload object will be use when we use createReducer approach.
  // // yield put({type: 'JOKE_SUCCESS', payload: joke}) // put effects dispatch the action (JOKE_SUCCESS) under worker Saga function.

//// The below updateJoke-action will be use when we use SliceReducer approach.
  yield put(updateJoke(joke)) // put effects dispatch the action (JOKE_SUCCESS) under worker Saga function.
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
function* jokeSaga() {
    yield takeLatest('GET_JOKE', getJoke)
  }
  
   export default jokeSaga