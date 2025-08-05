
import { useFormik } from 'formik';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

function Register() {

    let navigateFunc = useNavigate();
    let [errorMass, setErrorMass] = useState('');
    let [successMess, setSuccessMess] = useState('');
    let [isClicked, setIsClicked] = useState(true);

    let rigForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        onSubmit: async function regApi(values) { //this function returns a parameter represents submitted values 
            setIsClicked(false)
            axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
                .then(function (x) {
                    setErrorMass('');

                    setSuccessMess('congratulations')
                    setTimeout(function () {
                        setSuccessMess('');
                        navigateFunc('/login');
                    }, 1000)
                    setIsClicked(true)
                })
                .catch(function (x) { // x is the whole object
                    setErrorMass(x.response.data.message);
                    setSuccessMess('');
                    setTimeout(function () {
                        setErrorMass('')
                    }, 1000)
                    setIsClicked(true)
                })
        },
        validate: function (allData) { //this function returns a parameter contains the data
            const errors = {};
            let regexName = /^[A-Z][a-z]{3,8}$/;
            let regexPhone = /^(20)?01[0125][0-9]{8}$/;
            if (!regexName.test(allData.name)) {
                errors.name = 'Name should start with a capital letter and be more than 3 letters and less than 9';
            }
            if (!regexPhone.test(allData.phone)) {
                errors.phone = 'Enter a valid Egyptian phone number';
            }
            if (!allData.email.includes('@') || !allData.email.includes('.')) {
                errors.email = 'Enter a valid email'
            }
            if (allData.password.length < 6) {
                errors.password = 'Password should be more than 5 characters';
            }
            if (allData.password !== allData.rePassword) {
                errors.rePassword = 'Password should match';
            }
            return errors; //we can name it with any name 
        }
    })


    return (<>
        <div className="min-h-screen">
            <h2 className="text-darkRed font-black text-5xl my-8 uppercase text-center">Register Now</h2>


            {errorMass ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">{errorMass}</div> : ''}
            {successMess ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400" role="alert">{successMess}</div> : ''}



            <form onSubmit={rigForm.handleSubmit} className="max-w-md mx-auto">

                <div className="relative z-0 w-full mb-5 group">
                    <input value={rigForm.values.name} onBlur={rigForm.handleBlur} onChange={rigForm.handleChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-gray-900 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-darkRed font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name: </label>
                    {rigForm.errors.name && rigForm.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                        {rigForm.errors.name}
                    </div> : ''}

                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input value={rigForm.values.email} onChange={rigForm.handleChange} onBlur={rigForm.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-darkRed font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address:</label>

                    {rigForm.errors.email ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                            {rigForm.errors.email}
                        </div> : ''}

                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input value={rigForm.values.password} onChange={rigForm.handleChange} onBlur={rigForm.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-darkRed font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>

                    {rigForm.errors.password && rigForm.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                        {rigForm.errors.password}
                    </div> : ''}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input value={rigForm.values.rePassword} onChange={rigForm.handleChange} onBlur={rigForm.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-darkRed font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password:</label>
                    {rigForm.errors.rePassword && rigForm.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                        {rigForm.errors.rePassword}
                    </div> : ''}

                </div>


                <div className="relative z-0 w-full mb-5 group">
                    <input value={rigForm.values.phone} onChange={rigForm.handleChange} onBlur={rigForm.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-darkRed font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number:</label>

                    {rigForm.errors.phone && rigForm.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                        {rigForm.errors.phone}
                    </div> : ''}

                </div>

                <button type="submit" className="text-lightBeige bg-darkRed hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-softRed font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                    {isClicked ? 'Submit' : <TailSpin
                        visible={true}
                        height="25"
                        width="25"
                        color="#A14646"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />}
                </button>
            </form>

        </div>
    </>);
}

export default Register;