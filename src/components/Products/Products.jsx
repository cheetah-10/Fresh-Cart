import axios from "axios";
import { useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContextObject } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishListContextObject } from "../../Context/WishListContext";

function Products() {
    const { addProduct } = useContext(cartContextObject);
    const {
        handleAddProductToWishList,
        removeFromWishList,
        getUserWishList,
        allWishListProducts,
        handleRemoveFromWishList,
        toggleAddAndRemove

    } = useContext(wishListContextObject);



    async function handleAddProduct(id) {
        const resFlag = await addProduct(id);
        if (resFlag) {
            toast.success("Product Added Successfully", {
                duration: 750
            });
        } else {
            toast.error("Error Adding Product", {
                duration: 750
            });
        }
    }

    async function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: "getProducts",
        queryFn: getAllProducts
    });

    if (isError) {
        return <h2>ERROR FOUND</h2>;
    }

    if (isLoading) {
        return (
            <div className="bg-lightBeige z-50 absolute inset-0 flex font-bolder justify-center items-center">
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#A14646"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                />
            </div>
        );
    }

    return (
        <div className="md:w-5/6 m-auto grid md:grid-cols-3 xlg:grid-cols-6 lg:grid-cols-4">
            {data.data.data.map((product) => {
                const isInWishList = allWishListProducts?.some(
                    (p) => p._id === product._id
                );

                return (
                    <div key={product._id} className="product relative p-2 m-4">
                        <Link to={`/productDetails/${product._id}`}>
                            {product.priceAfterDiscount && (
                                <div className="sale top-7 right-5 font-light text-2xl text-white px-1 rounded absolute bg-red-700">
                                    Sale
                                </div>
                            )}
                            <img
                                className="w-full"
                                src={product.imageCover}
                                alt={product.title}
                            />
                            <div className="px-4">
                                <h3 className="text-softRed text-2xl my-2">
                                    {product.category.name}
                                </h3>
                                <h2 className="text-darkRed font-semibold text-2xl mb-2">
                                    {product.title.split(" ").splice(0, 2).join(" ")}
                                </h2>
                                <div className="flex justify-between items-center">
                                    <p className="text-darkRed font-bold">
                                        <span
                                            className={
                                                product.priceAfterDiscount
                                                    ? "line-through text-red-500"
                                                    : ""
                                            }
                                        >
                                            {product.price}
                                        </span>{" "}
                                        <span>{product.priceAfterDiscount}</span> EGP
                                    </p>
                                    <p className="text-darkRed font-bold">
                                        <i className="fa-solid text-yellow-500 fa-star"></i>{" "}
                                        {product.ratingsAverage}
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <div className="flex justify-between mt-3">
                            <p
                                onClick={() => handleAddProduct(product._id)}
                                className="addBtn text-white w-full text-xl p-3 rounded text-center m-5 bg-softRed cursor-pointer"
                            >
                                + Add
                            </p>

                            <p
                                onClick={() =>
                                    toggleAddAndRemove(product._id,isInWishList)
                                }
                                className={`text-3xl cursor-pointer font-bold transition-colors duration-300 ${
                                    isInWishList ? "text-red-600" : "text-red-300"
                                }`}
                            >
                                <i className="fa-solid fa-heart"></i>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Products;
