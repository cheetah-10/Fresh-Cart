import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function AllOrders() {

    const [allOrrdersDetails, setAllOrrdersDetails] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCartItems, setSelectedCartItems] = useState([]);

    let userId

    function getUserInfo() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((res) => {
            console.log(res.data.decoded.id)
            userId = res.data.decoded.id
            getAllOrders();

        })
            .catch((error) => { console.log(error) })
    }

    function getAllOrders() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            .then((res) => {
                console.log(res.data)
                setAllOrrdersDetails(res.data)
            })
            .catch((error) => { console.log(error) })
    }

    getUserInfo()

    return (<>

        <div className=" min-h-screen mx-auto w-[85%]">

                        <h2 className="text-darkRed font-black text-5xl my-8 uppercase text-center">All Orders</h2>
            
                        <Link to='/'>
                            <button className="my-3 rounded-xl bg-darkRed hover:bg-red-900 text-lightBeige p-3 "><i class="fa-solid fa-house"></i></button>
            
                        </Link>
            <div className="relative my-7 overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left rtl:text-right ">
                    <thead className="text-xs text-darkRed uppercase bg-lightBeige">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Method
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Price
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Cart Items
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrrdersDetails?.map(order => <tr className="odd:bg-darkPink even:bg-softRed text-lightBeige ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {new Date(order.createdAt).toLocaleString("en-EG", {
                                    timeZone: "Africa/Cairo",
                                    dateStyle: "medium",
                                    timeStyle: "short"
                                })}
                            </th>
                            <td className="px-6 py-4">
                                {order.paymentMethodType}
                            </td>
                            <td className="px-6 py-4">
                                {order.totalOrderPrice} LE
                            </td>
                            <td onClick={() => {
                                setSelectedCartItems(order.cartItems)
                                setModalOpen(true)
                            }} className="px-6 py-4 bg-darkRed text-center hover:bg-red-900 cursor-pointer shadow-inner">
                                <a href="#" className="font-medium">Show Cart Items</a>
                            </td>
                        </tr>)}




                    </tbody>
                </table>
            </div>
        </div>

        {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-[10000] flex justify-center items-center">
                <div className="bg-white rounded-xl p-6 w-[90%] md:w-[70%] lg:w-[60%] shadow-lg max-h-[80vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 text-darkRed text-center">
                        {selectedCartItems.length} Items!
                    </h2>



                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-16 py-3">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Count
                                    </th>
                                </tr>
                            </thead>
                            {
                                <tbody>
                                    {selectedCartItems.map((item) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td className="p-4">
                                                <img
                                                    src={item.product.imageCover}
                                                    className="w-10 md:w-20 max-w-full max-h-full"
                                                    alt={item.product.title}
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.product.title}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.price} LE
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {item.count}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            }


                        </table>
                    </div>







                    <div className="text-center mt-6">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="bg-darkRed text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}


    </>);
}

export default AllOrders;