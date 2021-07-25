import { useState, useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import axios from '../../axios'

const ProfileForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const authCtx = useContext(AuthContext)
    const passwordInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault()
        const password = passwordInputRef.current.value

        setIsLoading(true)
        axios.post('accounts:update', {
            idToken: authCtx.token,
            password: password,
            returnSecureToken: false
        }).then(res => {
            console.log('res: ', res)
            alert('Success!')
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
    return (
        <form>
            <label htmlFor="password">New password:</label><br />
            <input type="password" name="password" ref={passwordInputRef} /><br /><br />
            <button type="submit" onClick={event => submitHandler(event)} disabled={isLoading}>
                {isLoading ? 'Loading ...' : 'Change password'}
            </button>
        </form>
    )
}

export default ProfileForm