import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import classes from './Navigation.module.css'

const Navigation = () => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn

    const logoutHandler = () => {
        authCtx.logout()
    }

    return (
        <header className={classes.topHeader}>
            <Link to="/">
                <div>React GCP Auth</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to="/auth">Login</Link>
                        </li>
                    )}
                    {
                        isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <button type="button" onClick={logoutHandler}>Logout</button>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Navigation