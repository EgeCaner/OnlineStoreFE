import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from './user.actions';
import { handleResetPasswordAPI } from './user.helpers';
import {apiInstance} from "./../../Utils";
import {loginUserService} from  '../User/authenticationService';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import history from '../../redux/history';



export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data()
      })
    );

  } catch (err) {
    // console.log(err);
  }
}
//
function forwardTo(location) {
  history.push(location);
}

export function* usernameSignIn( payload ) {
  try {
    console.log("calling user service");
    const response = yield call(loginUserService, payload);
    //const resdata = response.data;
    console.log("out of user service");

    console.log(response);
   // { type: userTypes.SIGN_IN_SUCCESS, response: response.data }
   console.log("calling user reducer");

    yield put(signInSuccess(response.data));
      
    
    console.log("out of user reducer");

    //const token = response.data;
    //localStorage.setItem("jwttoken", token);
    //console.log(response.data);
    
    //yield call(forwardTo, '/');
    //history.go(0);



    


  } catch (error) {
    console.log("error on saga");
    //yield put({ type: userTypes.userError, error })
  }
}

export function* onusernameSignInStart() {
  yield takeLatest(userTypes.USERNAME_SIGN_IN_START, usernameSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);

  } catch (err) {
    // console.log(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}


export function* signOutUser() {
  try {
    //localStorage.removeItem("jwttoken")
    yield put(
      signOutUserSuccess()
    )

  } catch (err) {
    // console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: {
  displayName,
  email,
  password,
  confirmPassword
} }) {

  if (password !== confirmPassword) {
    const err = ['Password Don\'t match'];
    yield put(
      userError(err)
    );
    return;
  }

  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);

  } catch (err) {
    console.log(err);
  }

}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email }}) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(
      resetPasswordSuccess()
    );

  } catch (err) {
    yield put(
      userError(err)
    )
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);

  } catch (err) {
    // console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}


export default function* userSagas() {
  yield all([
    call(onusernameSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ])
}