
import { useFormik } from 'formik';
import axios from 'axios'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { AuthContextObject } from '../../Context/AuthContext';
import { cartContextObject } from '../../Context/CartContext';
import { passwordContextObject } from '../../Context/PasswordContext';

function Login() {


    const { setToken } = useContext(AuthContextObject)
    const { getUserCart } = useContext(cartContextObject)
    const { sendResetCode } = useContext(passwordContextObject)

    let navigateFunc = useNavigate();
    let [errorMass, setErrorMass] = useState('');
    let [successMess, setSuccessMess] = useState('');
    let [isClicked, setIsClicked] = useState(true);


    let loginForm = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async function regApi(values) { //this function returns a parameter represents submitted values 
            setIsClicked(false)
            axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
                .then(function (x) {


                    localStorage.setItem('tkn', x.data.token);
                    setToken(x.data.token);

                    getUserCart()



                    setErrorMass('');
                    setSuccessMess('Welcome Back')
                    setTimeout(function () {
                        setSuccessMess('');
                        navigateFunc('/');
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
            if (!allData.email.includes('@') || !allData.email.includes('.')) {
                errors.email = 'Enter a valid email'
            }
            if (allData.password.length < 6) {
                errors.password = 'Password should be more than 5 characters';
            }
            return errors; //we can name it with any name 
        }
    })


    return (<>
        <div className="min-h-screen">
            <h2 className="text-darkRed font-black text-5xl my-8 uppercase text-center">Login Now</h2>


            {errorMass ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">{errorMass}</div> : ''}
            {successMess ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:text-green-400" role="alert">{successMess}</div> : ''}



            <form onSubmit={loginForm.handleSubmit} className="max-w-md mx-auto">



                <div className="relative z-0 w-full mb-5 group">
                    <input value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-darkRed bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-darkPink peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-darkRed font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address:</label>

                    {loginForm.errors.email ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                            {loginForm.errors.email}
                        </div> : ''}

                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-darkRed bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-darkRed font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>

                    {loginForm.errors.password && loginForm.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                        {loginForm.errors.password}
                    </div> : ''}
                </div>



                <button type="submit" className=" bg-darkRed  text-lightBeige hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-softRed font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    {isClicked ? 'Login' : <TailSpin
                        visible={true}
                        height="20"
                        width="20"
                        color="#A14646"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />}
                </button>

            </form>

            <div className="max-w-md mx-auto bg-lightBeige p-3 mt-8 rounded-2xl shadow">
                <p className='text-darkRed font-semibold text-xl text-center'>Forgot Your Password?</p>
                <p className='text-darkRed text-center my-2'>Reset From here <i class="fa-solid fa-arrow-down"></i></p>
                <div className="flex">
                    <button onClick={() => { navigateFunc('/ForgetPassword') }} className=" mt-3 mx-auto bg-darkRed  text-lightBeige hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-softRed font-medium rounded-lg text-sm  px-5 py-2.5 text-center">
                        Forget Password
                    </button>
                </div>
            </div>
        </div>

    </>);
}

export default Login;