import NewProduct from "@/components/admin/NewProduct";

const OfficeNewProduct = () => {
  return (
    <div className="flex flex-col p-5 gap-5">
      <div className=" text-center text-3xl">
        <h1 className="uppercase">New product</h1>
      </div>
      <div>
        <NewProduct />
      </div>
    </div>
  );
};

export default OfficeNewProduct;
