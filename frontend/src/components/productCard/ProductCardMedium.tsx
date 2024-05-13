import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "../ui/button";
import { Product } from "@/types/product.type";
import { fetchApiPrivate } from "@/lib/apiPrivate";
import { useNavigate } from "react-router-dom";

type ProductCardMediumProps = {
  product: Product;
  onDelete: () => void;
  admin?: boolean;
};

const deleteProductApi = async (id: string) => {
  const response = await fetchApiPrivate("DELETE", `products/${id}`);
  return response;
};

const ProductCardMedium = ({
  product,
  onDelete,
  admin,
}: ProductCardMediumProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const deleteProduct = async () => {
    const response = await deleteProductApi(product.id);
    if (response.status === 200) {
      onDelete();
      navigate("/admin");
    }
  };

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
          onClick={deleteProduct}
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
