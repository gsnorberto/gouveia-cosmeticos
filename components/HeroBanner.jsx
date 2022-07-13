import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const HeroBanner = ({ props }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="cosmetic-products">{props.smallText}</p>
                <h3>{props.midText}</h3>
                <h1>{props.largeText1}</h1>

                <img src={urlFor(props.image)} alt="Banner Goveia Cosméticos" className="hero-banner-image" />

                <div>
                    <Link href={`/product/${props.product}`}>
                        <button>{props.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{props.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;