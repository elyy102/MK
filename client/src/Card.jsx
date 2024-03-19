import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import heart from './assets/heart.svg'
import Modal from "./ModalRecord"
import Modal_2 from "./ModalMore"


export const Card = () => {

  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
  setShowModal(!showModal);
};

const [showModal2, setShowModal2] = useState(false);

const toggleShowModal2 = () => {
setShowModal2(!showModal2);
};

const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [date, setDate] = useState('')
const [imageValue, setImageValue] = useState('')
const [image, setImage] = useState()
const [place, setPlace] = useState('')
const [adress, setAdress] = useState('')
const [thematic, setThematic] = useState('')
const [age_limit, setAgeLimit] = useState('')

const [masterclasses, setMasterClasses] = useState([])


const token = useSelector((state) => state.auth.token)

useEffect(() => {
  fetch("http://localhost:3000/masterclasses_all/", {
    method: 'GET',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`

    }
  })
    .then(data => data.json())
    .then(data => setMasterClasses(data))
}, [])

  return (
    <>

{
    masterclasses.map(el =>
    <div className="card">
        <div className="image_container">
          <Modal_2 show={showModal2} onCloseButtonClick={toggleShowModal2} />
          <img src={el.image} alt="" onClick={toggleShowModal2}/>
          <div class="card_like"><img src={heart} alt="" /></div>
          <div class="card_price">{el.price}</div>
        </div>
        
        <p className="card_name">{el.name}</p>
        <p className="card_date">{el.date}</p>
        <div>
        <Modal show={showModal} onCloseButtonClick={toggleShowModal} />
          <button className='card_btn' onClick={toggleShowModal}>Записаться</button>
        </div>
    </div>
    )
  }
    </>
  )
}

export default Card