import { Button } from "../ui/button";

type ProductCardMediumProps = {
  name: string;
  price: number;
  image: string;
  description: string;
};

const ProductCardMedium = ({
  name,
  price,
  image,
  description,
}: ProductCardMediumProps) => {
  return (
    <div className="flex flex-col h-auto w-80 bg-white border shadow-border shadow-md rounded-xl p-4 gap-5">
      <div className="border border-black rounded-xl h-2/3 max-h-2/3">
        <img src={image} alt={name} className="w-full h-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-1 h-1/3">
        <div className="flex justify-between">
          <div className="text-base text-ellipsis">{name}</div>
          <div className="text-base">${price}</div>
        </div>
        <div className="text-sm text-ellipsis text-gray-400">{description}</div>
      </div>
      <Button className="rounded-xl">Add to Cart</Button>
    </div>
  );
};

export default ProductCardMedium;
