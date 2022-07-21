import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext();

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type='button'
                    className='cart-heading'
                    onClick={() => setShowCart(false)}
                >
                    <AiOutlineLeft />
                    <span className='heading'>Seu Carrinho</span>
                    <span className='cart-num-items'>({totalQuantities} itens)</span>
                </button>

                {/* Empty cart */}
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Seu carrinho está vazio</h3>
                        <Link href='/'>
                            <button
                                type='button'
                                onClick={() => setShowCart(false)}
                                className='btn'
                            >
                                Continue comprando
                            </button>
                        </Link>

                    </div>
                )}

                <div className="product-container">
                    {/* Items in cart */}
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            {/* Product image */}
                            <img src={urlFor(item?.image[0])} className="cart-product-image" />

                            <div className="item-desc">
                                {/* Title and price */}
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                {/* Buttons */}
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className='minus' onClick="">
                                                <AiOutlineMinus />
                                            </span>
                                            <span className='num' onClick=""> 0 </span>
                                            <span className='plus' onClick="">
                                                <AiOutlinePlus />
                                            </span>
                                        </p>
                                    </div>

                                    <button
                                        type='button'
                                        className='remove-item'
                                        onClick=""
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subtotal and total price */}
                {cartItems.length >= 1 && (
                    <div className="cart-botton">
                        <div className="total">
                            <h3>Subtotal</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type='button' className='btn' onClick="">
                                Ir para pagamento
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart