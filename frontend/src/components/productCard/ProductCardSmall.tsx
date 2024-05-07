import { CartItem } from "@/types/cart.type";
import { Button } from "../ui/button";
import { useCartStore } from "@/lib/store/cartStore";

type ProductCardSmallProps = {
  product: CartItem;
};

const ProductCardSmall = ({ product }: ProductCardSmallProps) => {
  const { incrementQuantity, decrementQuantity } = useCartStore();

  return (
    <div className="flex flex-col justify-between gap-2 bg-white border shadow-border shadow-md rounded-xl p-2 h-40">
      <div className="flex gap-2">
        <div className="w-2/5 border border-black rounded-xl">
          <img
            className="w-full h-full rounded-xl"
            src={product.photo}
            alt={product.name}
          />
        </div>
        <p className="w-3/5">{product.name}</p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex justify-between items-center w-2/5">
          <Button
            className="rounded-full w-8 h-8"
            onClick={() => decrementQuantity(product.id)}
          >
            -
          </Button>
          <p>{product.quantity}</p>
          <Button
            className="rounded-full w-8 h-8"
            onClick={() => incrementQuantity(product.id)}
          >
            +
          </Button>
        </div>
        <div className=" pr-2">{product.price * product.quantity}€</div>
      </div>
    </div>
  );
};

export default ProductCardSmall;
