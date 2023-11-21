import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'

const Header = () => {
    const {user, handleUserLogout} = useAuth()
    const nameStyle = {
        color: '#cb32b7',
        fontSize: "25px",
    };
    const nameStyle2 = {
        color: '#ffffff',
        fontSize: "15px",
    };
    return (
    <div id="header--wrapper">
        {user ? (
            <>
                <p  style={nameStyle}><span style={nameStyle2}>Welcome</span> {user.name}</p>
                <LogOut className="header--link" onClick={handleUserLogout}/>
            </>
        ): (
            <>
                <Link to="/">
                    <LogIn className="header--link"/>
                </Link>
            </>
        )}
    </div>
  )
}

export default Header