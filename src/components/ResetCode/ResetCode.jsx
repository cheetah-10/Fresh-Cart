
import { useNavigate } from 'react-router-dom';
import { passwordContextObject } from '../../Context/PasswordContext';
import { useContext, useState } from 'react';


function ResetCode() {
    let navigateFunc = useNavigate();
    const { sendResetCode, verifyResetCode } = useContext(passwordContextObject)

    const [resetCode, setResetCode] = useState(''); // 1️⃣ State to hold email

async function handleVerify(code) {
  try {
    await verifyResetCode(code);
    navigateFunc('/resetPassword');
  } catch (err) {
    toast.error("Invalid reset code");
  }
}

    return (<>
        <div className="min-h-screen">
            <div>
                <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 ">reset</label>
                <input onChange={(e) => setResetCode(e.target.value)} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="rest code" />
                <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our

                </p>
            </div>

            <button onClick={() => {handleVerify(resetCode) }} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">reset password</button>

        </div>
    </>);
}

export default ResetCode;