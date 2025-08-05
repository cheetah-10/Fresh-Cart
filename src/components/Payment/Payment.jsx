import { useFormik } from "formik";
import { useContext } from "react";
import { cartContextObject, headers } from "../../Context/CartContext";
import axios from "axios";
import { useState } from "react";

function Payment() {

    const { cartId, clearUI } = useContext(cartContextObject)
    const [isOnline, setIsOnline] = useState(false)

    function detectAndCall(values) {
        if (isOnline) {
            onlinePayment(values)

        }
        else {
            createCashOrder(values)

        }

    }
    function onlinePayment(values) {
        const backendBody = {
            shippingAddress: values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
            backendBody,
            {
                headers,
                params: {
                    url: 'http://localhost:5173'
                }
            },
        )
            .then((res) => {
                window.open(res.data.session.url)
                // clearUI()

            })
            .catch((error) => {
                console.log(error);
            })
    }






    function createCashOrder(values) {
        const backendBody = {
            shippingAddress: values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, backendBody, { headers })
            .then((res) => {
                clearUI()

            })
            .catch((error) => {
                console.log(error);
            })
    }


    const paymentFormik = useFormik({
        initialValues: {
            details: '',
            city: '',
            phone: '',
        },
        onSubmit: detectAndCall,
    })



    return (<>
        <div className="container mx-auto p-5">
            <h2 className="text-darkRed font-black text-3xl my-8  text-center">We Need To Know Some Details</h2>


            <form onSubmit={paymentFormik.handleSubmit} className="max-w-md mx-auto">



                <div className="relative z-0 w-full mb-5 group">
                    <input value={paymentFormik.values.details} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="details" className="peer-focus:font-medium font-bold absolute text-sm text-darkRed  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address Details</label>

                    {paymentFormik.errors.details ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                            {paymentFormik.errors.details}
                        </div> : ''}

                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input value={paymentFormik.values.phone} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="font-bold peer-focus:font-medium absolute text-sm text-darkRed  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone:</label>

                    {paymentFormik.errors.phone && paymentFormik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                        {paymentFormik.errors.phone}
                    </div> : ''}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input value={paymentFormik.values.city} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="city" className="font-bold peer-focus:font-medium absolute text-sm text-darkRed  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city:</label>

                    {paymentFormik.errors.city && paymentFormik.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                        {paymentFormik.errors.city}
                    </div> : ''}
                </div>



                    <div className="w-fit mx-auto">
                        <button onClick={() => { setIsOnline(false) }} type="submit" className="text-lightBeige bg-darkRed hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-softRed font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Cash Payment Order
                        </button>
                        <button onClick={() => { setIsOnline(true) }} type="submit" className=" mx-2 text-lightBeige bg-darkRed hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-softRed font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Online Payment Order
                        </button></div>
            </form>


        </div>
    </>);
}

export default Payment;