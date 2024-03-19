import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react"

const ModalMore = ({ show, onCloseButtonClick }) => {
  if (!show) {
    return null;
  }

  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
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
    <div className="modal-wrapper">
      <div className="modal_more">
        <div className="modal_head">
          <p className="p_modal_head">О событии</p>
          <button className="close_card" onClick={onCloseButtonClick}>х</button>
        </div>
          <div className="modal_content_more">
              <div className="modal_content_more_1">
                  <div className="modal_content_more_1_1">
                      <h1 className="modal_content_more_1_h1">Место проведения </h1>
                      <p className="modal_content_more_1_p">{el.place}</p>
                  </div>
                  <div className="modal_content_more_1_1">
                      <h1 className="modal_content_more_1_h1">Цена</h1>
                      <p className="modal_content_more_1_p">{el.price}</p>
                  </div>
                  <div className="modal_content_more_1_1">
                      <h1 className="modal_content_more_1_h1">Возрастное ограничение</h1>
                      <p className="modal_content_more_1_p">{el.age_limit}</p>
                  </div>
              </div>
              <div className="modal_content_more_2">
                  <div className="modal_content_more_1_1">
                      <h1 className="modal_content_more_1_h1">Адрес </h1>
                      <p className="modal_content_more_1_p">{el.adress}</p>
                  </div>
                  <div className="modal_content_more_1_1">
                      <h1 className="modal_content_more_1_h1">Образовательная тематика </h1>
                      <p className="modal_content_more_1_p">{el.thematic}</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
        )
      }

    </>
  )
}

export default ModalMore;
