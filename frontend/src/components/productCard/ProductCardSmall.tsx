import { CartItem } from "@/types/cart.type";
import { Button } from "../ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { fetchApiPrivate } from "@/lib/apiPrivate";

type ProductCardSmallProps = {
  product: CartItem;
};

const addItemToCart = async (productId: string) => {
  const response = await fetchApiPrivate("POST", `carts/${productId}`);
  return response;
};

const removeItemToCart = async (productId: string) => {
  const response = await fetchApiPrivate("DELETE", `carts/${productId}`);
  return response;
};

const ProductCardSmall = ({ product }: ProductCardSmallProps) => {
  const { incrementQuantity, decrementQuantity } = useCartStore();

  const addToCartHandler = async () => {
    const response = await addItemToCart(product.id);
    if (response.status === 200) {
      incrementQuantity(product.id);
    }
  };

  const removeFromCartHandler = async () => {
    const response = await removeItemToCart(product.id);
    if (response.status === 200) {
      decrementQuantity(product.id);
    }
  };

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
            onClick={() => removeFromCartHandler()}
          >
            -
          </Button>
          <p>{product.quantity}</p>
          <Button
            className="rounded-full w-8 h-8"
            onClick={() => addToCartHandler()}
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
