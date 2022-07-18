import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { client, urlFor } from '../../lib/client';

import { Product } from '../../components';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;

    const [index, setIndex] = useState(0);
    
    return (
        
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} alt="" />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => {
                            <img 
                                src={urlFor(item)}
                                className={ i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        })}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Detalhes:</h4>
                    <p>{details}</p>
                    <p className="price">{price}</p>
                    <div className="quantity">
                        <h3>Quantidade:</h3>
                        <p className="quantity-desc">
                            <span className='minus' onClick="">
                                <AiOutlineMinus />
                            </span>
                            <span className='num' onClick="">
                                0
                            </span>
                            <span className='plus' onClick="">
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick=''>Adicionar ao Carrinho</button>
                        <button type='button' className='buy-now' onClick=''>Compre agora</button>
                    </div>
                </div>
            </div>
            
            {/* SIMILAR PRODUCTS */} 
            <div className='maylike-products-wrapper'>
                <h2>Você também pode gostar de: </h2>
                <div className='marquee'>
                    <div className="maylike-products-container track">
                        {products.map((product) => (
                            <Product 
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
// When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
export const getStaticPaths = async () => {
    // Get all slugs from each product
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);

    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    // Especific product referenced from the slug
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`
    const product = await client.fetch(query);

    // Similar products
    const productsQuery = '*[_type == "product"]'
    const products = await client.fetch(productsQuery);

    return {
        props: {
            product, products
        }
    };
}

export default ProductDetails