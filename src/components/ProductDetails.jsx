import BarsLoader from "../utilities/BarsLoader";

/* eslint-disable react/prop-types */
const ProductDetails = ({
  selectedProduct,
  isProcessing,
  closeForm,
  readyEditForm,
  deleteProduct,
}) => {
  return (
    <div className="bg-white px-10 py-3 flex flex-col gap-5 h-[80vh] overflow-y-scroll">
      <p className="text-2xl text-theGreen font-bold text-center">
        Product Deatails
      </p>

      <div className="flex flex-col gap-3">
        <div className="bg-red-500 w-[320px] h-[320px] mx-auto">
          <img
            src={selectedProduct?.imageUrl}
            alt=""
            className=" w-full h-full"
          />
        </div>

        <div className="lg:p-0 p-5">
          <p className="">
            Product Name:
            <span className="font-bold text-theGreen text-3xl">
              {" "}
              {selectedProduct?.title}
            </span>
          </p>

          <div className="w-[70%] my-3 mx-auto p-5 shadow-lg">
            <p className="my-1 font-bold text-theGreen underline">Prices</p>
            <ul>
              <li className="flex items-center justify-between">
                Nigeria:{" "}
                <span className=" text-lg font-bold text-theSubGreen">
                  {selectedProduct?.priceNgn} {selectedProduct?.nigeriaCode}
                </span>
              </li>
              <li className="flex items-center justify-between">
                Ghana:{" "}
                <span className=" text-lg font-bold text-theSubGreen">
                  {selectedProduct?.priceGhana} {selectedProduct?.ghanaCode}
                </span>
              </li>
              <li className="flex items-center justify-between">
                Canada:{" "}
                <span className=" text-lg font-bold text-theSubGreen">
                  {selectedProduct?.priceCanada} {selectedProduct?.canadaCode}
                </span>
              </li>
              <li className="flex items-center justify-between">
                United State:{" "}
                <span className=" text-lg font-bold text-theSubGreen">
                  {selectedProduct?.priceUs} {selectedProduct?.usCode}
                </span>
              </li>
              <li className="flex items-center justify-between">
                United Kingdom:{" "}
                <span className=" text-lg font-bold text-theSubGreen">
                  {selectedProduct?.priceUk} {selectedProduct?.ukCode}
                </span>
              </li>
            </ul>
          </div>

          <div className="">
            <ul>
              <li className="">
                Data:{" "}
                <span className=" text-theSubGreen font-bold">
                  {" "}
                  {new Date(selectedProduct?.created_at).toDateString()}
                </span>
              </li>
              <li className="">
                Categories:{" "}
                <span className=" capitalize text-theSubGreen font-bold">
                  {" "}
                  {selectedProduct?.categories.join(", ")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10">
        <button
          disabled={isProcessing}
          onClick={closeForm}
          className={`text-white bg-gray-500 px-6 py-3 font-bold`}
        >
          cancel
        </button>
        <button
          disabled={isProcessing}
          onClick={readyEditForm}
          className={`bg-theSubGreen text-white px-6 py-3 font-bold`}
        >
          Edit Product
        </button>
        <button
          disabled={isProcessing}
          onClick={deleteProduct}
          className={`bg-red-500 text-white px-6 py-3 font-bold`}
        >
          {isProcessing ? (
            <BarsLoader color={"#fff"} height={20} />
          ) : (
            "Delete Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
