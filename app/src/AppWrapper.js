import {isLoggedIn} from './helper/auth'
import Dashboard from './Components/Dashboard';
import {Navigate} from 'react-router-dom'

export default function AppWrapper(){
    console.log('In AppWrapper!')
    if(isLoggedIn() === false) return <Navigate to={"/login"} />
    return <Dashboard />
}