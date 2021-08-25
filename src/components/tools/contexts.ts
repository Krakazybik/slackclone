import { createContext, Dispatch, SetStateAction } from "react"

interface IJWTContext {
  jwtToken: string
  setJwtToken: Dispatch<SetStateAction<string>>
}
export const JWTContext = createContext<Partial<IJWTContext>>({})
export const AuthContext = createContext(false)
