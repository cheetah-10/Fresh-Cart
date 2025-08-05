import { useContext, useState } from "react";
import { userProfileObject } from "../../Context/UserProfileContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { error, getUserInfo, userName, userRole, userId, updateUserData } = useContext(userProfileObject);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    getUserInfo();
  };

  async function handleUpdate() {
    const resFlag = await updateUserData(name, email, phone);
    if (resFlag) {
      setName("");
      setEmail("");
      setPhone("");
      toast.success('Data updated successfully');
      getUserInfo();
      setIsOpen(false);

      localStorage.setItem('tkn', '')
      navigate('/login')
    } else {
      toast.error(error);
    }
  }


  return (
    <> {localStorage.getItem('tkn')?
            <div className="">

        <div className="right-0 fixed translate-y-20">
          <button
            onClick={handleOpen}
            className="text-white bg-gray-700 hover:bg-black font-medium rounded-full text-2xl px-4 py-2 "
          >
            <i className="fa-solid fa-user"></i>
          </button>
        </div>

        <div
          className={`fixed top-0 right-0 z-[9997] h-screen p-4 overflow-y-auto bg-white shadow w-80 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="text-softRed text-lg w-8 h-8 absolute top-2.5 end-2.5"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          <div className="flex flex-col gap-4 items-center mt-10">
            <i className="fa-solid fa-image-portrait text-center text-7xl"></i>
            <p className="text-softRed font-mono font-semibold text-2xl">Hello {userName || "Loading..."} <i class="fa-solid fa-hand"></i></p>
            <p className="text-softRed text-lg">You are {userRole || "Loading..."}</p>

            <h3 className="text-lg font-semibold mt-4 capitalize text-softRed">Want to update your info?</h3>

            <input
              type="text"
              placeholder="New Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
            />
            <input
              type="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
            />
            <input
              type="tel"
              placeholder="New Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
            />

            <button
              onClick={() => { handleUpdate() }}
              className="mt-2 px-4 py-2 bg-softRed text-white rounded hover:bg-red-500"
            >
              Update
            </button>
          </div>
        </div>


      </div>: ''
    }



    </>
  );
}

export default UserProfile;
