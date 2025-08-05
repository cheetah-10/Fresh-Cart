import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";

export const cartContextObject = createContext();

export let headers = {
    token: localStorage.getItem('tkn')
}
function CartContextProvider({ children }) {

    const [allProducts, setAllProducts] = useState(null)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState(null)

    function clearUI(){
        setAllProducts(null)
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        setCartId(null)
    }



    async function addProduct(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            // We return the axios promise so the calling function can use .then and .catch to handle success or failure.
            // Since we want the function to indicate whether the operation succeeded (true) or failed (false),
            // we made it async and explicitly return true in .then and false in .catch.
            // If we didn't return the axios call, the function would return undefined and we wouldn't be able to chain actions based on the result.    

            "productId": productId
        }, {
            headers: {
                token: localStorage.getItem('tkn'),
            }
        }





        ).then((res) => {
            // setNumOfCartItems(res.data.numOfCartItems)
            // setAllProducts(res.data.data.products)
            // setTotalCartPrice(res.data.data.totalCartPrice)
            getUserCart()

            return true;
        }).catch((error) => {
            console.log(error);
            return false
        })
    }

    function getUserCart() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers,
        }).then((res) => {
            setAllProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
            setCartId(res.data.data._id)
            
        })
            .catch((error) => {
                console.log(error);
            })
    }

    function updateCount(productId, newCount) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { "count": newCount },
            {
                headers,
            })
            .then((res) => {
                setAllProducts(res.data.data.products)
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPrice(res.data.data.totalCartPrice)
            })
            .catch((error) => {
                console.log("hi", error);
            })
    }

    async function deleteProduct(id) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { headers },
        )
            .then((res) => {
                setAllProducts(res.data.data.products)
                setNumOfCartItems(res.data.numOfCartItems)
                setTotalCartPrice(res.data.data.totalCartPrice)
                return true
            })
            .catch((error) => {
                console.log(error);
                return false

            })
    }
    async function clearCart() {
        return await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
            { headers },
        )
            .then((res) => {
             
                return true
            })
            .catch((error) => {
                console.log(error);
                return false

            })
    }

    useEffect(() => {
        getUserCart()

    }, []) 
    return (<>
        <cartContextObject.Provider value={{ addProduct, totalCartPrice, numOfCartItems, allProducts, getUserCart, updateCount, deleteProduct, clearCart, cartId, clearUI
 }}>
            {children}
        </cartContextObject.Provider>
    </>);
}

export default CartContextProvider;