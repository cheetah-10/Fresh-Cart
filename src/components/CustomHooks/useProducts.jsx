import axios from "axios";
import { useQuery } from "react-query";

function useProducts() {
    async function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
             
      }

  const res = useQuery({
      queryKey:'getProducts',
      queryFn: getAllProducts
  })
    return res;
}

export default useProducts;