import React from 'react'
import Add_mk from "./Add_mk";
import Person from "./assets/person.fill.svg"
import Paint from "./assets/paintpalette.fill.svg"
import { useDispatch } from 'react-redux'
import { logOut } from './redux/authSlice'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';

function Profile_admin() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const [user, setUser] = useState([])

  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    fetch("http://localhost:3000/user_info/", {
      method: 'GET',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
      .then(data => data.json())
      .then(data => setUser(data))
  }, [])

  return (
    <>

{
        Array.isArray(user) && user.map(el =>
              
              <div className='wrapper'>
        <Header />
    <div className="login_2">
    <div className="login">
        <div className="login_rectangle">
            <div className="info_name">
                <img src={Person} alt="" className="profile_icon" />
                <h1 className="name">{el.name}</h1>
            </div>
                <p className="email">Email : <span>{el.email}</span></p>
                <p className="email">Номер телефона : <span>{el.phone_number}</span></p>
            <hr class="hr-line"></hr>
            <Add_mk />
            <div className="info_btn">
                <Link to={'/afisha'}><img src={Paint} alt="" className="profile_icon" /></Link>
                <Link to={'/afisha'}><h1 className="like">Все мастер-классы</h1></Link>
            </div>
            <button className='logout_btn' onClick={() => {
                dispatch(logOut())
            }}>Выйти</button>
        </div>
    </div>
</div>
<Footer />
</div>

            
            )
          }
      
    </>
  )
}

export default Profile_admin