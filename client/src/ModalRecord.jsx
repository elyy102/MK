import { useState } from 'react'
import { useSelector } from 'react-redux'

const ModalRecord = ({ show, onCloseButtonClick }) => {
    if (!show) {
      return null;
    }

    /*const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
  
    const token = useSelector((state) => state.auth.token)
  
    async function add(name1, phone_number1, email1) {
      const data = new FormData();
  
      data.append('name', name)
      data.append('phone_number', phone_number)
      data.append('email', email)

      console.log(data)
      await fetch("http://localhost:3000/records/", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      setName('')
      setPhoneNumber('')
      setEmail('') 
    } */   

    return (
      <>
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal_head">
            <p className="p_modal_head">Запись</p>
            <button className="close_card" onClick={onCloseButtonClick}>х</button>
          </div>
          <form className="modal_content" >
            <input className='login_input' placeholder='Введите ФИО...' type="text"  />
            <input  className='password_input' placeholder='Введите номер телефона...' type="text" />
            <input className='login_input' placeholder='Введите email...' type="email" />
            <button className='logout_btn' type="submit">Записаться</button>
        </form>
        </div>
      </div>
      </>
  )
}  
export default ModalRecord;
  