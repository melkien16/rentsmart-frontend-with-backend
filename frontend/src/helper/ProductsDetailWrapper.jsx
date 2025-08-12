import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductDetail } from "../components/browse/ProductDetail";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/ui/Loader";

const ProductDetailWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch products using the API slice
  const { data: products, isLoading, error } = useGetProductsQuery();
  const product = products?.find((p) => p._id === id);

  useEffect(() => {
    if (!isLoading && !product) {
      navigate("/items", { replace: true });
    }
  }, [isLoading, product, navigate]);

  if (isLoading) return <Loader />;
  if (!product) return null;

  return <ProductDetail product={product} onBack={() => navigate("/items")} />;
};

export default ProductDetailWrapper;
