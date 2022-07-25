import React, { createContext, useContext, useState, useEffect, Children } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1); //Quantity

    let foundProduct;
    let index;

    // Add product to cart
    const onAdd = (product, quantity) => {
        // check if the product already exists in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        // Update product total price and quantity
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        // If product is already in the cart, just increase its quantity
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                // search for corresponding product in cart, copy your dataset and update quantity only
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);

        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }])
        }

        toast.success(`${qty}${product.name} added to the cart`);
    }

    // increase and decrease the quantity of product directly from the cart
    const toggleCartItemQuantity = (id, value) => {
        
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);

        //const newCartItems = cartItems.filter((cartProduct) => cartProduct._id !== id) // remove item 

        const newCartItems = cartItems;
        

        if (value === 'inc') { //increase the quantity of product
            newCartItems[index].quantity += 1;
            setCartItems([
                ...newCartItems
                //{ ...foundProduct, quantity: foundProduct.quantity + 1 }
            ]);

            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);

        } else if (value === 'dec') { //decrease the quantity of product
            
            if (foundProduct.quantity > 1) {
                newCartItems[index].quantity -= 1;
                setCartItems([
                    ...newCartItems
                    //{ ...foundProduct, quantity: foundProduct.quantity - 1 }
                ]);
                
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);

                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    // increase the quantity of the product
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
        //setQty(qty + 1)
    }

    // decrease the quantity of the product
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        })
    }

    return (
        <Context.Provider
            value={{
                setShowCart,
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);