import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

function Brands() {

    async function getBrands() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    }
    const { data, isError, error, isLoading } = useQuery({
        queryKey: 'allBrands',
        queryFn: getBrands
    })
    if (isError) {
        return (<>
            <h1>hello</h1>
        </>)
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
            </div>
        </>)
    }
    return (<>
        <div className="container py-5 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {data.data.data.map((brand) =>
                    <div key={brand._id} className="brand rounded-xl bg-softRed">

                        <div className="p-5">
                            <img src={brand.image} alt={brand.name} className="w-full mb-2 rounded-xl" />
                        </div>
                        <h2 className="text-center text-lightBeige text-3xl font-semibold mb-8">{brand.name}</h2>
                    </div>)}

            </div>
        </div>
    </>);
}

export default Brands;