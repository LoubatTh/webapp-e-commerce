import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "../ui/button";
import { Product } from "@/types/product.type";

type ProductCardMediumProps = { product: Product; admin?: boolean };

const ProductCardMedium = ({ product, admin }: ProductCardMediumProps) => {
  const { addItem } = useCartStore();

  const addToCartHandler = () => {
    addItem(product);
  };

  return (
    <div className="flex flex-col h-auto w-72 bg-white border shadow-border shadow-md rounded-xl p-4 gap-5">
      <div className="border border-black rounded-xl h-2/3 max-h-2/3">
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-full rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-1 h-1/3">
        <div className="flex justify-between">
          <div className="text-base text-ellipsis">{product.name}</div>
          <div className="text-base">${product.price}</div>
        </div>
        <div className="text-sm text-ellipsis text-gray-400">
          {product.description}
        </div>
      </div>
      {admin ? (
        <Button
          className="rounded-xl"
          variant="destructive"
          onClick={addToCartHandler}
        >
          Delete Product
        </Button>
      ) : (
        <Button className="rounded-xl" onClick={addToCartHandler}>
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default ProductCardMedium;
