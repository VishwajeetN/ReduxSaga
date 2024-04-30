import { all ,call } from 'redux-saga/effects'
import jokeSaga from './jokeSaga'
import userSaga from './userSaga'

function* rootSaga(){
    //// yield all parallaly run the multiple saga.
yield all(
    [
        // jokeSaga(),
        // userSaga()

        // // We can also call the above function by using call effect as below.
        call(jokeSaga),
        call(userSaga)
    ]
)
}

export default rootSaga;