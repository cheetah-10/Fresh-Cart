import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useContext } from "react";
import { cartContextObject } from "../../Context/CartContext.jsx";
import toast from "react-hot-toast";
import ImageSlider from "../ImageSlider/ImageSlider.jsx";



function ProductDetails() {
    const { id } = useParams();
    const { addProduct } = useContext(cartContextObject)

    async function handleAddProduct(id) {
        const resFlag = await addProduct(id)
        console.log('resFlag', resFlag);

        if (resFlag) {
            toast.success('Product Added Successfully', {
                duration: 750
            })

        }
        else {
            toast.error('Adding Product Error', {
                duration: 750
            })
        }

    }

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isError, isLoading } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: getProductDetails,
    })


    if (isError) {
        return (
            <><h2>ERROR FOUNDED</h2></>
        )
    }
    if (isLoading) {
        return (
            <>
                <div className="bg-lightBeige z-50 absolute inset-0 flex font-bolder justify-center items-center">
                    <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#A14646"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>

            </>
        )
    }
    const objectDetails = data.data.data;

    const { imageCover, images, priceAfterDiscount } = objectDetails;





    return (<>
        <div className="min-h-screen">
            {priceAfterDiscount && (<>
                <h2 className="text-darkRed font-bold text-5xl my-8 uppercase text-center">SALE <i class="fa-regular fa-face-grin-beam"></i></h2>
            </>)}
            <div className="sm:w-[90%] mx-auto p-5 flex-col md:flex-row flex items-center justify-between" key={objectDetails._id}>
                <div className="w-full sm:w-[60%] md:w-[30%]">
                    <ImageSlider imageCover={imageCover} images={images} />
                </div>
                <div className="w-[90%] md:w-[70%]" >
                    <h2 className="text-darkRed font-bold text-4xl">{objectDetails.title}</h2>
                    <h2 className="text-darkRed font-semibold text-3xl my-2">More Details</h2>
                    <p className="text-softRed text-xl">{objectDetails.description}</p>
                    <p className="text-softRed text-xl"><span className="font-bold">Category: </span> {objectDetails.category.name}</p>
                    <p className="text-softRed text-xl"><span className="font-bold">Brand: </span> {objectDetails.brand.name}</p>

                    {priceAfterDiscount ? (<div className="my-3">
                        <p className="font-bold text-3xl text-softRed">Price: {priceAfterDiscount} LE</p>
                        <p className="line-through text-gray-400 font-semibold text-xl">{objectDetails.price}</p>
                    </div>) : <div className="my-3">
                        <p className="font-bold text-3xl text-softRed">Price: {objectDetails.price} LE</p>
                    </div>}
                    <p className="text-softRed mb-5 font-bold text-2xl">
                        <i className="fa-solid text-yellow-500 fa-star"></i>{" "}
                        {objectDetails.ratingsAverage}
                    </p>

                    <button onClick={() => { handleAddProduct(objectDetails._id) }} className="addBtn text-white text-xl rounded-xl text-center bg-softRed cursor-pointer w-full p-5">+ Add product to cart</button>
                </div>
            </div>
        </div>

    </>);
}

export default ProductDetails;