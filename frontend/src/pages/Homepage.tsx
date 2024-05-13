import { products } from "@/lib/DUMMY-DATA/products";
import ProductCardMedium from "@/components/productCard/ProductCardMedium";
import { useCartStore } from "@/lib/store/cartStore";
import { SideCart } from "@/components/cart/SideCart";

const Homepage = () => {
  const { items } = useCartStore();
  const isEmpty: boolean = items.length === 0;

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
            <ProductCardMedium key={product.id} product={product} />
          ))}
        </div>
      </div>
      {!isEmpty && <SideCart />}
    </div>
  );
};

export default Homepage;
