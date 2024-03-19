import React from 'react'
import { useSelector } from 'react-redux'
import { Profile_user } from './Profile_user'
import Profile_admin from './Profile_admin'

const MainPage = () => {

    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.role)

    return (
        <>
            {
                role === "ADMIN" ? 
                <Profile_admin /> 
                : 
                <Profile_user />
            }
        </>
    )
}

export default MainPage