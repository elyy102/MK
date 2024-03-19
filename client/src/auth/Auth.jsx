import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginThunk } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Log = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const nav = useNavigate()

    useEffect(() => {

    }, [authState])

    return (
        authState.error ? <p>{authState.error}</p> :
        authState.loading ? <p>Loading...</p> :
        <div className='wrapper'>
        <div className="login_2">
        <div className="login">
            <h1 className='login_rectangle_h1'>Авторизация</h1>
            <div className="login_rectangle">
                <input className='login_input' placeholder='Введите имя...' value={username} onChange={(e) => {
                                setUsername(e.target.value)
                            }} type="text" />
                <input  className='password_input' placeholder='Введите пароль...' value={password} onChange={(e) => {
                                setPassword(e.target.value)
                            }} type="password" />
                <button className='login_btn' onClick={() => {
                                dispatch(loginThunk({
                                    username: username,
                                    password: password
                                }))
                            }}>Войти</button>
                <p className='login_p'>Ещё нет аккаунта? 
                    <Link to={'/reg'}>Зарегистрироваться</Link>
                </p>
            </div>
        </div>
        </div>
    </div>
    )
}

export default Log