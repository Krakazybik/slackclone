import React from "react"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { exit } from "../../store/login"

const Exit: React.FC = () => {
  const dispatch = useDispatch()
  dispatch(exit())
  return <Redirect to="/login" />
}

export default Exit
