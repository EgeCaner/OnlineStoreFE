import axios from "axios"
import {useSelector} from "react-redux"
export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
  const {userRoles} = currentUser
  if (userRoles.includes("admin")) return true

  return false
}

export const apiInstance = axios.create({
  baseURL: "http://localhost:5000",
})

export function setToken(token) {
  console.log(`token is set `)
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
