import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'

import { client } from '../lib/client'

const home = ({products, bannerData}) => {

    return (
        <>
            <HeroBanner props={bannerData.length && bannerData[0]}/>

            <div className='products-heading'>
                <h2>Mais vendidos</h2>
                <p>Shampoos para diversos tipos de cabelo</p>
            </div>

            {/* Products for sale */}
            <div className='products-container'>
                {products?.map( product => 
                    <Product key={product._id} product={product}/>
                )}
            </div>

            <FooterBanner footerBanner={bannerData && bannerData[0]}/>
        </>
    )
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]' // all products from sanity
    const products = await client.fetch(query);

    const bannerQuery = '*[_type == "banner"]' // all data from banner
    const bannerData = await client.fetch(bannerQuery);

    return {
        props: {
            products, bannerData
        }  
    };
}

export default home