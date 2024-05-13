import { useCartStore } from "@/lib/store/cartStore";
import ProductCardSmall from "../productCard/ProductCardSmall";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SideCart = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const totalCart = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  };
  useEffect(() => {
    totalCart();
  }, [items]);

  return (
    <div className="w-72 border-l shadow-border shadow-md fixed h-screen right-0 top-[41px] justify-between">
      <ScrollArea className="flex flex-col text-center justify-center max-h-[calc(100vh-110px)] h-[calc(100vh-60px)] w-full p-4">
        <div className="flex flex-col item-center">
          <button className="uppercase my-4" onClick={clearCart}>
            Your Cart
          </button>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <ProductCardSmall key={item.id} product={item} />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="flex flex-col justify-center items-center w-72 fixed border-l border-t shadow-border shadow-md right-0 bottom-0 pb-3 bg-background">
        <div>Total: {total}€</div>
        <button
          onClick={() => {
            navigate("/payment");
          }}
          className="w-2/3 bg-primary text-white py-2"
        >
          Purchase
        </button>
      </div>
    </div>
  );
};
