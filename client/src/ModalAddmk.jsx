import { useState } from 'react'
import { useSelector } from 'react-redux'

const ModalAddmk = ({ show, onCloseButtonClick }) => {
    if (!show) {
      return null;
    }
  
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [imageValue, setImageValue] = useState('')
    const [image, setImage] = useState()
    const [place, setPlace] = useState('')
    const [adress, setAdress] = useState('')
    const [thematic, setThematic] = useState('')
    const [age_limit, setAgeLimit] = useState('')
  
    const token = useSelector((state) => state.auth.token)
  
    async function add(name1, price1, date1, place1, adress1, thematic1, age_limit1, image1) {
      const data = new FormData();
  
      data.append('name', name)
      data.append('price', price)
      data.append('date', date)
      data.append('image', image[0])
      data.append('place', place)
      data.append('adress', adress)
      data.append('thematic', thematic)
      data.append('age_limit', age_limit)

      console.log(data)
      console.log(image)
      await fetch("http://localhost:3000/add_mk/", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      setName('')
      setPrice('')
      setDate('')
      setPlace('')
      setAdress('')
      setThematic('')
      setAgeLimit('')
      setImage()
      setImageValue('')
  
    }

    return (
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal_head">
            <p className="p_modal_head">Добавление мастер-класса</p>
            <button className="close_card" onClick={onCloseButtonClick}>х</button>
          </div>
          <form className="modal_content" encType='multipart/form-data' onSubmit={(e) => {
        e.preventDefault()
        console.log("gut")
        add(name, price, date, place, adress, thematic, age_limit, image)

      }}>
            <input className='login_input' placeholder='Название...' type="text" value={name} onChange={(e) => {
            setName(e.target.value)
          }} required />
            <input className='login_input' placeholder='Цена...' type="text" value={price} onChange={(e) => {
            setPrice(e.target.value)
          }} required />
            <input className='login_input' placeholder='Дата...' type="text" value={date} onChange={(e) => {
            setDate(e.target.value)
          }} required />
            <input className='login_input' placeholder='Прикрепите файл...' type="file" value={imageValue} onChange={(e) => {
            setImageValue(e.target.value)
            setImage(e.target.files)
          }} required />
            <input className='login_input' placeholder='Место проведения ...' type="text" value={place} onChange={(e) => {
            setPlace(e.target.value)
          }} required />
            <input className='login_input' placeholder='Адрес...' type="text" value={adress} onChange={(e) => {
            setAdress(e.target.value)
          }} required />
            <input className='login_input' placeholder='Образовательная тематика...' type="text" value={thematic} onChange={(e) => {
            setThematic(e.target.value)
          }} required />
            <input className='login_input' placeholder='Возрастное ограничение...' type="text" value={age_limit} onChange={(e) => {
            setAgeLimit(e.target.value)
          }} required />
            <button className='logout_btn' type="submit">Добавить</button>
        </form>
        </div>
      </div>
    );
};
  
export default ModalAddmk;
  