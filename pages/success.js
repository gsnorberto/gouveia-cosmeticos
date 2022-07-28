import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks(); 
    }, []);

  return (
    <div className='success-wrapper'>
        <div className="success">
            <p className="icon">
                <BsBagCheckFill />
            </p>
            <h2>Tudo certo com sua compra!</h2>
            <p className="email-msg">Confira sua caixa de entrada do E-mail com todas informações</p>
            <p className="description">
                Dúvidas? Entre em contato conosco!
                <a href="mailto:sn_gabriel@outlook.com" className="email">sn_gabriel@outlook.com</a>
            </p>
            <Link href="/">
                <button type='button' width="300px" className="btn">
                    Voltar para página Inicial
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success