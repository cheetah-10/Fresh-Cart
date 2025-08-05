import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContextObject } from "../../Context/AuthContext";
import { cartContextObject } from "../../Context/CartContext";

function Navbar() {
    const outNavigate = useNavigate();
    const { token, setToken } = useContext(AuthContextObject);
    const { numOfCartItems } = useContext(cartContextObject);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleLogout() {
        localStorage.removeItem("tkn");
        setToken(null);
        outNavigate("/login");
        setIsMenuOpen(false);
    }

    return (
        <nav className="bg-lightBeige w-full p-2 md:p-0 z-[999] sticky top-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <NavLink to="/" className="flex self-start" onClick={() => setIsMenuOpen(false)}>
                    <span className="self-start text-4xl font-semibold whitespace-nowrap text-darkRed">
                        <i className="fa-solid fa-cart-shopping text-softRed"></i>Fresh Cart
                    </span>
                </NavLink>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-darkPink rounded-lg lg:hidden focus:outline-none focus:ring-2"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className={`${isMenuOpen ? "block" : "hidden"} d-flex flex-col justify-between lg:flex-row w-full lg:block lg:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 rounded-lg text-center lg:bg-transparent lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 ">
                        {token && (
                            <>
                                <li>
                                    <NavLink to="/home" onClick={() => setIsMenuOpen(false)} className="block text-xl py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className="block text-xl py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block text-xl py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Wish List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products" onClick={() => setIsMenuOpen(false)} className="block text-xl py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/categories" onClick={() => setIsMenuOpen(false)} className="block text-xl py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/brands" onClick={() => setIsMenuOpen(false)} className="block text-xl py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Brands</NavLink>
                                </li>
                            </>
                        )}

                        <div className="bg-transparent lg:bg-transparent">
                            <ul className="flex flex-col lg:flex-row ms-7">
                                {token ? (
                                    <>
                                        <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                                            <li>
                                                <div className="relative w-fit flex mx-auto">
                                                    <i className="fa-solid fa-cart-shopping block text-3xl px-3 py-2 text-softRed cursor-pointer rounded"></i>
                                                    <div className="w-6 h-6 shadow bg-darkRed text-center text-sm text-lightBeige absolute top-0 right-0 rounded-full">
                                                        <p>{numOfCartItems <= 9 ? numOfCartItems : "9+"}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                        <li>
                                            <span onClick={handleLogout} className="block text-xl px-3 py-2 text-darkPink rounded lg:bg-transparent cursor-pointer lg:hover:bg-transparent hover:bg-red-100">Log Out</span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block text-xl px-3 py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Log In</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/register" onClick={() => setIsMenuOpen(false)} className="block text-xl px-3 py-2 text-darkPink rounded lg:bg-transparent lg:hover:bg-transparent hover:bg-red-100">Register</NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
