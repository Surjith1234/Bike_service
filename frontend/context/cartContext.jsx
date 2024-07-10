import { createContext, useContext, useState } from "react";



const cartContext=createContext()

const CartProvider=({children})=>{
    const [cartItems,setCartItems]=useState([])
    const addToCart=(item)=>{
        const exist=cartItems.find((x)=>x._id===item._id)
        if(exist)
        {
            setCartItems(
                cartItems.map((x)=>x._id===item._id?{...exist}:x)
            )
        }
        else{
            setCartItems(
                [...cartItems,{...item}]
            )
        }
    }

    const removeToCart = (item) => {
        const exist = cartItems.find((x) => x._id === item._id);
        if (exist) {
            setCartItems(cartItems.filter((x) => x._id !== item._id));
        }
    };
   
    return(
        <cartContext.Provider value={{addToCart,cartItems,removeToCart} }>
             {
                children
             }
        </cartContext.Provider>
    )
}

const useCartContext=()=>{
    return useContext(cartContext)
}


export {CartProvider,useCartContext};
