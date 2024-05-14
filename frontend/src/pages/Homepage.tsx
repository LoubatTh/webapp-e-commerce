import ProductCardMedium from "@/components/productCard/ProductCardMedium";
import { useCartStore } from "@/lib/store/cartStore";
import { SideCart } from "@/components/cart/SideCart";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import { fetchApi } from "@/lib/api";

const getAllProducts = async () => {
  const response = await fetchApi("GET", "products");
  return response;
};

const Homepage = () => {
  const { items } = useCartStore();
  const isEmpty: boolean = items.length === 0;
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await getAllProducts();
    const data: Product[] = response.data as Product[];
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center p-5">
        <div
          className={
            !isEmpty
              ? "grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4"
              : "grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
          }
        >
          {products.map((product) => (
            <ProductCardMedium
              key={product.id}
              product={product}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>
      {!isEmpty && <SideCart />}
    </div>
  );
};

export default Homepage;
