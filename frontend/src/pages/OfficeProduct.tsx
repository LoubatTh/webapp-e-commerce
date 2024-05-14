import ProductCardMedium from "@/components/productCard/ProductCardMedium";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchApiPrivate } from "@/lib/apiPrivate";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import { isAuthenticated } from "@/lib/auth/checkUser";

const getAllProducts = async () => {
  const response = await fetchApiPrivate("GET", "products");
  return response;
};

const OfficeProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductDelete = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  const fetchProducts = async () => {
    const response = await getAllProducts();
    const data: Product[] = response.data as Product[];
    setProducts(data);
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, []);
  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="flex items-center gap-5">
        <Button
          onClick={() => {
            navigate("/add-product");
          }}
          className=" bg-green-500 rounded-xl"
        >
          + Add a new product
        </Button>
        <h1>Welcome to the back office</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center">
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {products.map((product) => (
              <ProductCardMedium
                key={product.id}
                product={product}
                onDelete={() => handleProductDelete(product.id)}
                admin={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeProduct;
