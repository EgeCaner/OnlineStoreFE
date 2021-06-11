import axios from "axios"
import {useSelector} from "react-redux"

export const apiInstance = axios.create({
  baseURL: "http://localhost:5000",
})

export function setToken(token) {
  console.log(`token is set `)
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
  const {userRoles} = currentUser

  const userRoles1 = userRoles[0].split(" ")

  if (userRoles1.includes("admin")) return true

  return false
}

export const checkUserIsProduct = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
  const {userRoles} = currentUser
  const userRoles1 = userRoles[0].split(" ")
  if (userRoles1.includes("product")) return true
  return false
}
export const checkUserIsSales = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false
  const {userRoles} = currentUser
  const userRoles1 = userRoles[0].split(" ")
  if (userRoles1.includes("sales")) return true
  return false
}
