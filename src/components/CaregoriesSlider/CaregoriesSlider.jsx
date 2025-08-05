import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TailSpin } from "react-loader-spinner";
import useCategories from "../CustomHooks/useCategories";

function CaregoriesSlider() {

    // const [allCategories, setAllCategories] = useState(null)


    // async function getCategories() {
    //      await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    //     .then((x)=>{
    //         setAllCategories(x.data.data);

    //     })
    //     .catch((x)=>{
    //         console.log('error', x);
    //     })

    // }

    // useEffect(() => { getCategories() }, [])
    const { data, isError, isLoading } = useCategories();


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 3,
        // autoplay: true,
        // autoplaySpeed: 2000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1350, // Screens smaller than 1024px
                settings: {
                    slidesToShow: 5, // Show 4 slides
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200, // Screens smaller than 1024px
                settings: {
                    slidesToShow: 4, // Show 4 slides
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 860, // Screens smaller than 768px
                settings: {
                    slidesToShow: 2, // Show 2 slides
                    slidesToScroll: 1,
                }
            }
        ]
    };

    if (isError) {
        return (<><h1>hello</h1></>)
    }
    if (isLoading) {
        return (<>
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
            </div></>)
    }
    return (
        <>
            <div className="my-5"><Slider {...settings} >
                {data.data.data.map((category) => <div key={category._id}>
                    <img className="w-full h-80" src={category.image} alt={category.name} />
                    <h3 className="CFour text-center text-2xl font-semibold">{category.name}</h3>
                </div>)}</Slider></div>
        </>


    );
}

export default CaregoriesSlider;
