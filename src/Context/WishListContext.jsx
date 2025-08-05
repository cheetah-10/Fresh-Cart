import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const wishListContextObject = createContext()


function WishListContextProvider({ children }) {


    const [allWishListProducts, setAllWishListProducts] = useState(null)
    const [numberOfWishListItems, setNumberOfWishListItems] = useState(0)



    async function addProductToWishList(productId) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { "productId": productId },
            {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            }
        ).then((res) => {
            console.log(res)
            return true
        }
        ).catch((error) => {
            console.log(error)
            return false
        })
    }

    async function handleAddProductToWishList(id) {
        const resFlag = await addProductToWishList(id)
        if (resFlag) {
            getUserWishList();
            toast.success("Product Added To Wish List Successfully", {
                duration: 750
            })
        }
        else {
            toast.error("Error Adding Product", {
                duration: 750
            })
        }
    }
    function getUserWishList() {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((res) => {
            setAllWishListProducts(res.data.data)
            setNumberOfWishListItems(res.data.count)
        })
            .catch((error) => {
                console.log(error);
            })
    }

    async function removeFromWishList(id) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((res) => {
            setAllWishListProducts(res.data.data)
            setNumberOfWishListItems(res.data.count)
            return true
        }).catch((error) => {
            console.log(error);
            return false
        })
    }

    async function handleRemoveFromWishList(id) {
        const resFlag = await removeFromWishList(id)
        if (resFlag) {
            getUserWishList()
            toast.success("Product Removed From Wish List Successfully", {
                duration: 750
            })
        }
        else {
            toast.error("Error Removing Product", {
                duration: 750
            })
        }
    }

    async function toggleAddAndRemove(id, isInWishList) {
        if (isInWishList) {
            await handleRemoveFromWishList(id);
        } else {
            await handleAddProductToWishList(id);
        }
    }

    useEffect(() => {
        getUserWishList()
    }, [])




    return (<>
        <wishListContextObject.Provider value={{ addProductToWishList, handleAddProductToWishList, getUserWishList, allWishListProducts, numberOfWishListItems, removeFromWishList, handleRemoveFromWishList, toggleAddAndRemove }}>
            {children}
        </wishListContextObject.Provider>
    </>)

}


export default WishListContextProvider
