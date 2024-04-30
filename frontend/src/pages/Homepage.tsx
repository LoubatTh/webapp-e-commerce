import { products } from "@/lib/DUMMY-DATA/products";
import ProductCardMedium from "@/components/productCard/ProductCardMedium";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-center p-5">
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {products.map((product) => (
          <ProductCardMedium
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.photo}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
