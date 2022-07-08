import React from 'react'

const home = () => {
    return (
        <>
            Banner

            <div>
                <h2>Mais vendidos</h2>
                <p>Shampoos para diversos tipos de cabelo</p>
            </div>

            {/* Products for sale */}
            <div>
                {['Produto 1 ', 'Produto 2 ', 'Produto 3 '].map(product => product)}
            </div>

            Rodapé
        </>
    )
}

export default home