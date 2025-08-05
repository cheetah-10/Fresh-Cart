import axios from "axios";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useState } from "react";

function Categories() {
    const [modalOpen, setModalOpen] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [currentCategoryName, setCurrentCategoryName] = useState('');

    function getSubCategories(id, name) {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
            .then((res) => {
                const data = res.data.data;
                if (data.length === 0) {
                    toast.error("No subcategories found");
                } else {
                    setSubCategories(data);
                    setCurrentCategoryName(name);
                    setModalOpen(true);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong");
            });
    }

    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const { data, error, isError, isLoading } = useQuery({
        queryKey: "allCategories",
        queryFn: getAllCategories,
    });

    if (isError) return <h1 className="text-center mt-10">Error loading categories</h1>;

    if (isLoading)
        return (
            <div className="bg-lightBeige z-50 absolute inset-0 flex justify-center items-center">
                <TailSpin height="80" width="80" color="#A14646" />
            </div>
        );

    return (
        <>
            <div className="w-[85%] py-5 mx-auto">
                <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-5">
                    {data.data.data.map((category) => (
                        <div key={category._id} className="rounded-xl bg-softRed">
                            <div className="p-5">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full rounded-xl h-80 object-cover"
                                />
                            </div>
                            <h2 className="text-center text-lightBeige text-3xl font-semibold mb-5">
                                {category.name}
                            </h2>
                            <div className="w-fit mx-auto">
                                <button
                                    onClick={() => getSubCategories(category._id, category.name)}
                                    className="mb-5 bg-lightBeige text-darkRed px-4 py-3 rounded-lg text-md font-semibold hover:bg-rose-100 transition-all"
                                >
                                    View Subcategories
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-darkRed text-center">
                            {currentCategoryName} Subcategories
                        </h2>
                        <ul className="grid grid-cols-2 gap-2 text-center">
                            {subCategories.map((sub) => (
                                <li
                                    key={sub._id}
                                    className="text-md font-medium bg-lightBeige text-darkRed p-2 rounded"
                                >
                                    {sub.name}
                                </li>
                            ))}
                        </ul>

                        <div className="text-center mt-6">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="bg-darkRed text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Categories;
