import { products } from "@/lib/DUMMY-DATA/products";
import ProductCardMedium from "@/components/productCard/ProductCardMedium";
import { useCartStore } from "@/lib/store/cartStore";
import { SideCart } from "@/components/cart/SideCart";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      {!isEmpty && (
        <div className="w-72 border-l shadow-border shadow-md fixed h-screen right-0 top-10 justify-between">
          <ScrollArea className="flex flex-col text-center justify-center max-h-[calc(100vh-110px)] h-[calc(100vh-60px)] w-full p-4">
            <SideCart />
          </ScrollArea>
          <div className="flex flex-col justify-center items-center w-72 fixed border-l border-t shadow-border shadow-md right-0 bottom-0 pb-3 bg-background">
            <div>Total: </div>
            <button className="w-2/3 bg-primary text-white py-2">
              Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
