import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export default function useAuthContext() {
	return useContext(AuthContext)
}
