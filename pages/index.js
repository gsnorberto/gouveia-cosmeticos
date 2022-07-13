import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'

import { client } from '../lib/client'

const home = ({ products, bannerData }) => {
    return (
        <>
            <HeroBanner />

            <div className='products-heading'>
                <h2>Mais vendidos</h2>
                <p>Shampoos para diversos tipos de cabelo</p>
            </div>

            {/* Products for sale */}
            <div className='products-container'>
                {products?.map(product => product.name)}
            </div>

            <FooterBanner />
        </>
    )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]' // all products from sanity
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]' // all data from banner
    const bannerData = await client.fetch(bannerQuery);

    return { products, bannerData };
}

export default home