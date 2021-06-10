import {takeLatest, call, all, put} from "redux-saga/effects"
import {
  auth,
  handleUserProfile,
  /* getCurrentUser, */
  GoogleProvider,
} from "./../../firebase/utils"
import userTypes from "./user.types"
import {
  signInSuccess,
  signOutUserSuccess,
  resetPasswordSuccess,
  userError,
  usernameSignInStart,
} from "./user.actions"
import {addCart} from "./../Cart/cart.helpers"
import {removeCartItem} from "./../Cart/cart.actions"
import {
  handleResetPasswordAPI,
  signInWithUsernameAndPassword,
  createUserWithEmailAndPassword,
  getCurrentUser,
  getUserRole,
} from "./user.helpers"
import {setToken} from "../../Utils"

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    })
    const snapshot = yield userRef.get()
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    )
  } catch (err) {
    console.log(err)
  }
}

export function* usernameSignIn({payload: {username, password}}) {
  try {
    const userRes = yield signInWithUsernameAndPassword(username, password)
   
    console.log("heyhey",userRes)
    setToken(userRes.data.data)
    const userRole = yield getUserRole()
    yield put(signInSuccess({token: userRes.data.data, userRoles: [userRole]}))
    yield put(removeCartItem(10000))
  } catch (err) {
    console.log(err)
  }
}

export function* onUsernameSignInStart() {
  yield takeLatest(userTypes.USERNAME_SIGN_IN_START, usernameSignIn)
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    console.log(userAuth)
    if (!userAuth) return
    yield getSnapshotFromUserAuth(userAuth)
  } catch (err) {
    console.log(err)
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
  try {
    setToken("")
    yield put(signOutUserSuccess())
  } catch (err) {
    console.log(err)
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({
  payload: {username, email, password, confirmPassword},
}) {
  if (password !== confirmPassword) {
    const err = ["Password Don't match"]
    yield put(userError(err))
    return
  }

  try {
    const userResA = yield createUserWithEmailAndPassword(
      email,
      username,
      password
    )
    if (userResA.data.success) {
      const userResB = yield signInWithUsernameAndPassword(username, password)
      setToken(userResB.data.data)
      const userRole = yield getUserRole()

      yield put(
        signInSuccess({token: userResB.data.data, userRoles: [userRole]})
      )
      yield addCart()
      yield put(removeCartItem(10000))
    }
  } catch (err) {
    console.log(err)
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({payload: {email}}) {
  try {
    yield call(handleResetPasswordAPI, email)
    yield put(resetPasswordSuccess())
  } catch (err) {
    yield put(userError(err))
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn() {
  try {
    const {user} = yield auth.signInWithPopup(GoogleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    console.log(err)
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
  yield all([
    call(onUsernameSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ])
}
