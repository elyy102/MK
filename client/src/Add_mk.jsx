import React from 'react'
import Modal_5 from "./ModalAddmk"
import { useState } from "react"
import Plus from "./assets/plus.svg"


export const Add_mk = () => {

    const [showModal5, setShowModal5] = useState(false);

    const toggleShowModal5 = () => {
    setShowModal5(!showModal5);
  };

  return (
<div className="info_btn">
    <Modal_5 show={showModal5} onCloseButtonClick={toggleShowModal5} />
    <img src={Plus} onClick={toggleShowModal5} className="profile_icon" />
    <h1 className="like" onClick={toggleShowModal5}>Добавить мастер-класс</h1>
</div>
  )
}

export default Add_mk