import { wishListContextObject } from "../../Context/WishListContext";
import { Children, useContext } from "react";
import toast from "react-hot-toast";



function WishList() {

    const { allWishListProducts, numberOfWishListItems, handleRemoveFromWishList } = useContext(wishListContextObject)





    return (<>
        <div className="min-h-screen w-[85%] mx-auto mt-8">
            <div className="text-center text-darkRed">
                <i class="fa-regular fa-heart text-8xl "></i>
            </div>
            <h2 className="text-darkRed font-black text-5xl mb-8 text-center">My Wish List</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-lightBeige ">
                    <thead className="text-xs text-darkRed uppercase bg-rose-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Category
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
                        {allWishListProducts?.map(product =>
                            <tr className="bg-lightBeige border-b   border-gray-200">
                                <th scope="row" className="px-6 py-4 text-darkRed whitespace-nowrap font-bold tracking-wide ">
                                    {product.title}
                                </th>

                                <td className="text-darkRed px-6 py-4 font-medium">
                                    {product.category?.name}
                                </td>
                                <td className="text-darkRed px-6 py-4 font-medium">
                                    {product.priceAfterDiscount ? product.priceAfterDiscount : product.price} LE
                                </td>
                                <td onClick={() => { handleRemoveFromWishList(product._id) }} className="text-darkRed px-6 py-4">
                                    <a href="#" className=" text-red-600 font-bold hover:underline">Remove</a>
                                </td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>


            <h2 className="text-darkRed mt-5 text-3xl font-bold">TOTAL ITEMS: {numberOfWishListItems}!</h2>


        </div></>);
}

export default WishList;