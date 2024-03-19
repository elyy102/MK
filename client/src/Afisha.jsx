import React from 'react'
import Card from './Card'
import Header from './Header'
import Footer from './Footer'

export const Afisha = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="container_card">
      <div className="cards">
            <Card />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Afisha