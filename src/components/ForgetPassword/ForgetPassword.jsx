
import axios from 'axios'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { passwordContextObject } from '../../Context/PasswordContext';


function ForgetPassword() {

    const { sendResetCode } = useContext(passwordContextObject)

    const [email, setEmail] = useState(''); // 1️⃣ State to hold email

    let navigateFunc = useNavigate();

    function handleResetPassword(emailValue) {
        if (!emailValue || !emailValue.includes('@')) {
            alert('Please enter a valid email');
            return;
        }
        sendResetCode(emailValue);
        navigateFunc('/resetCode');
    }


    return (<>
        <div className="min-h-screen">



            <div>
                <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
            </div>

            <button onClick={() => { handleResetPassword(email) }} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">reset password</button>

        </div>
    </>);
}

export default ForgetPassword;