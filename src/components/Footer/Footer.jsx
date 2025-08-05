export default function Footer() {
    return (
     <>
       <div className="flex flex-col">
        <footer className="bg-lightBeige p-4 mt-auto">
          <h2 className="text-darkRed text-3xl">Get the Fresh Cart app</h2>
          <h3 className="text-softRed mt-5 text-xl">
            We Will send you a link, open it on your phone to download the app.
          </h3>
          <div className="flex justify-center items-center flex-col md:flex-row m-7">
            <form className="w-[70%] mb-2">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="border border-red-700 text-darkRed text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ps-10 p-2.5"
                  placeholder="Email..."
                />
              </div>
            </form>
            <p className="px-3 py-2 w-[70%] md:w-[20%] bg-darkRed text-center text-2xl mx-3 text-white rounded-md">
              Share App Link
            </p>
          </div>
        </footer>
      </div>
     </>
    );
  }
  