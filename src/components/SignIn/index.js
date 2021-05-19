import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useHistory} from "react-router-dom"
import {
  usernameSignInStart,
  googleSignInStart,
} from "./../../redux/User/user.actions"

import "./styles.scss"

import AuthWrapper from "./../AuthWrapper"
import FormInput from "./../forms/FormInput"
import Button from "./../forms/Button"

const mapState = ({user}) => ({
  currentUser: user.currentUser,
})

const SignIn = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {currentUser} = useSelector(mapState)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (currentUser) {
      resetForm()
      history.push("/")
    }
  }, [currentUser])

  const resetForm = () => {
    setUsername("")
    setPassword("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(usernameSignInStart({username, password}))
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart())
  }

  const configAuthWrapper = {
    headline: "LogIn",
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="username"
            name="username"
            value={username}
            placeholder="username"
            handleChange={(e) => setUsername(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">LogIn</Button>

          <div className="links">
            <Link to="/registration">Register</Link>
            {` | `}
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default SignIn
