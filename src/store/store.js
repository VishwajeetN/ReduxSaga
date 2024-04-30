import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/reducer';
import userSaga from '../sagas/userSaga';
import rootSaga from '../sagas/rootSaga'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

/// If we have single saga the run the only one saga
// // sagaMiddleware.run(userSaga)

//// Now we are passing the rootSaga (Containing multiple saga) in the sagaMiddleware. (For run multiple saga parallaly)
sagaMiddleware.run(rootSaga)
export default store;