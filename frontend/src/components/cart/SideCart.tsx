import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/lib/store/cartStore";
import ProductCardSmall from "../productCard/ProductCardSmall";

export const SideCart = () => {
  const { items, clearCart } = useCartStore();

  return (
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
  );
};
