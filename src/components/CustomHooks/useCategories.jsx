import axios from "axios";
import { useQuery } from "react-query";

function useCategories() {
    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const res = useQuery({
        queryKey: 'allCategories',
        queryFn: getAllCategories
    });

    return res;
}

export default useCategories;