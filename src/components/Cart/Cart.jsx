import { useContext, useEffect, useState } from "react";
import { cartContextObject } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


function Cart() {

    const { totalCartPrice, numOfCartItems, allProducts, getUserCart, updateCount, deleteProduct, clearCart } = useContext(cartContextObject)

    function handleUpdateCount(id, newCount) {
        updateCount(id, newCount);
    }

    function handleDeleteProduct(id) {
        deleteProduct(id)
        const resFlag = deleteProduct(id)
        if (resFlag) {
            toast.success("Product deleted successfully", { duration: 750 })
        }
        else {
            toast.error("Error deleting product", { duration: 750 })

        }
    }
    async function handleClearCart() {

        const resFlag = await clearCart()
        if (resFlag) {
            toast.success("Cart is clear", { duration: 750 })
            await getUserCart()
        }
        else {
            toast.error("Error clearing cart", { duration: 750 })

        }
    }

    return (<>



        <div className="w-[85%] mx-auto min-h-screen">

            <h2 className="text-darkRed font-black text-5xl my-8 uppercase text-center">My Cart</h2>
            <p className="text-center text-darkRed font-extrabold text-2xl font-mono">Your cart ({numOfCartItems} Items)</p>

            <h2 className="text-darkRed font-bold text-xl">Total Price: <span className="font-semibold">{totalCartPrice} LE <i class="fa-solid fa-money-bill-wave"></i></span></h2>

            <button onClick={() => { handleClearCart() }} className="p-3  bg-darkRed my-8 rounded-xl  hover:bg-red-600">
                <a href="#" className="font-medium text-lightBeige  hover:underline p-3 ">Clear Cart</a>
            </button>

            <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right ">
                    <thead className="text-x uppercase text-darkRed  bg-rose-200">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts?.map(product => <tr key={product._id} className="bg-lightBeige border-b ">
                            <td className="p-4">
                                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                            </td>
                            <td className="px-6 py-4 font-semibold text-darkRed ">
                                {product.product.title}
                            </td>
                            <td className="px-6 py-4 text-darkRed">
                                <div className="flex items-center">
                                    <button disabled={product.count == 1 ? true : false} onClick={() => handleUpdateCount(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-lightBeige bg-darkPink border border-darkRed rounded-full" type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <div>
                                        <input type="number" id="first_product" className="bg-softRed w-14 border border-darkPink text-sm rounded-lg  block px-2.5 py-1 placeholder-lightBeige " placeholder={product.count} required />
                                    </div>
                                    <button onClick={() => handleUpdateCount(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-lightBeige bg-darkPink border border-darkRed rounded-full" type="button">
                                        <span className="sr-only">Quantity button</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-darkRed">
                                {product.priceAfterDiscount?product.priceAfterDiscount:product.price}LE
                            </td>
                            <td onClick={() => { handleDeleteProduct(product.product._id) }} className="px-6 py-4">
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                            </td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>

            <Link to='/payment'>
                <button className="my-3 rounded-xl bg-darkRed hover:bg-red-900 text-lightBeige p-3 ">Pay your products</button>

            </Link>
            
        </div>
        

    </>);
}

export default Cart;