import ProductCardMedium from "@/components/productCard/ProductCardMedium";
import { useCartStore } from "@/lib/store/cartStore";
import { products } from "@/lib/DUMMY-DATA/products";

const OfficeProduct = () => {
  const { items } = useCartStore();

  return (
    <>
      <div>
        <h1>Back office</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center p-5">
          <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {products.map((product) => (
              <>
                <ProductCardMedium
                  key={product.id}
                  product={product}
                  admin={true}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeProduct;
