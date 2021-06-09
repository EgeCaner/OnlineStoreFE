import {apiInstance, setToken} from "./../../Utils"

export const signInWithUsernameAndPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .post("/Authentication/Login", {username, password})
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch(() => {
        const err = ["Username not found. Please try again."]
        reject(err)
      })
  })
}

export const handleResetPasswordAPI = (username) => {
  return new Promise((resolve, reject) => {
    apiInstance
      .put("Authentication/ChangePassword", {username})
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch(() => {
        const err = ["username not found. Please try again."]
        reject(err)
      })
  })
}

export const createUserWithEmailAndPassword = (email, username, password) => {
  console.log(email, username, password)
  return new Promise((resolve, reject) => {
    apiInstance
      .post("/Authentication/Register", {
        Username: username,
        MailAddress: email,
        Password: password,
      })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch(() => {
        const err = ["Unable to register. Please try again."]
        reject(err)
      })
  })
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("/Customer/GetById")
      .then((res) => {
        resolve(res)
        console.log(res)
      })
      .catch(() => {
        const err = ["Username not found. Please try again."]
        reject(err)
      })
  })
}

export const getUserRole = () => {
  return new Promise((resolve, reject) => {
    apiInstance
      .get("/Customer/GetRole")
      .then((res) => {
        console.log(res)
        resolve(res.data.data)
      })
      .catch(() => {
        const err = ["Role not found. Please try again."]
        reject(err)
      })
  })
}

/* export const createUserWithEmailAndPassword = (email, username, password) => {
  console.log(email, username, password)

  return new Promise((resolve, reject) => {
    apiInstance({
      method: "post",
      url: "/Authentication/Register",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        contentType: "application/json",
      },
    })
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch(() => {
        const err = ["Unable to register. Please try again."]
        reject(err)
      })
  })
}
 */
