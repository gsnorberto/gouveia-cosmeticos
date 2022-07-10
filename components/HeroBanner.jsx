import React from 'react'
import Link from 'next/link'

const HeroBanner = () => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="cosmetic-products"> SMALL TEXT </p>

                <h3>MID TEXT</h3>

                <img src="" alt="Banner Goveia Cosméticos" className="hero-banner-image" />

                <div>
                    <Link href="/product/ID">
                        <button>BUTTON TEXT</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>DESCRIPTION</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner