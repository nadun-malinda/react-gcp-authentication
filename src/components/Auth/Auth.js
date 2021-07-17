import { useState, useRef, useContext } from 'react'
import axios from '../../axios'
import AuthContext from '../../store/auth-context'
import classes from './Auth.module.css'

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoginForm, setIsLoginForm] = useState(false)
    const authCtx = useContext(AuthContext)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault()
        const url = isLoginForm ? '/accounts:signInWithPassword' : '/accounts:signUp'
        const email = emailInputRef.current.value
        const password = passwordInputRef.current.value

        setIsLoading(true)
        axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).then(res => {
            console.log('res: ', res)
            authCtx.login(res.data.idToken)
            setIsLoading(false)
        }).catch(err => {
            console.log('err: ', err)
            let errMessage = 'Authentication Failed!'
            if (err.response.data?.error?.message) {
                errMessage = err.response.data.error.message
            }
            alert(errMessage)
            setIsLoading(false)
        })
    }

    const switchAuthModeHandler = (event) => {
        event.preventDefault()
        setIsLoginForm(prevState => !prevState)
    }

    return (
        <>
            <h2>{isLoginForm ? 'Login' : 'SignUp'}</h2>
            <form>
                <label htmlFor="email">Email:</label>
                <br />
                <input type="email" name="email" ref={emailInputRef} />
                <br /><br />

                <label htmlFor="password">Password:</label>
                <br />
                <input type="password" name="password" ref={passwordInputRef} />
                <br /><br />

                {isLoading && <span>Loading ...</span>}
                {!isLoading && (
                    <button type="submit" onClick={(event) => submitHandler(event)}>
                        {isLoginForm ? 'Login' : 'SignUp'}
                    </button>
                )}

                <br />
                <button className={classes.authSwitchBtn} onClick={(event) => switchAuthModeHandler(event)}>
                    {isLoginForm ? 'Create new account' : 'Login with existing account'}
                </button>
            </form>
        </>
    )
}

export default Auth