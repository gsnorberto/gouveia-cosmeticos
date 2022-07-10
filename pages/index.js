import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'

const home = () => {
    return (
        <>
            <HeroBanner />

            <div className='products-heading'>
                <h2>Mais vendidos</h2>
                <p>Shampoos para diversos tipos de cabelo</p>
            </div>

            {/* Products for sale */}
            <div className='products-container'>
                {['Produto 1 ', 'Produto 2 ', 'Produto 3 '].map(product => product)}
            </div>

            <FooterBanner />
        </>
    )
}

export default home