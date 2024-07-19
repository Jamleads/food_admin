/* eslint-disable react/prop-types */
import BarsLoader from "../utilities/BarsLoader";
const inputStyle = "w-full border-2 border-theGreen px-3 py-1 rounded-lg";
// TODO: validation;

const ProductForm = ({
  isProcessing,
  editMode,
  handleChange,
  formState,
  addProduct,
  closeForm,
  handleCheckboxChange,
  handleFileChange,
  errorMessage,
  categories,
}) => {
  return (
    <>
      <div className="md:w-[85%] mx-auto bg-white flex flex-col gap-10 shadow-lg p-10">
        <div className="text-center text-theSubGreen">
          <p className="text-2xl font-bold">
            {editMode ? "Update Product" : "Add Product"}
          </p>
        </div>

        <form>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 text-theGreen">
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="title" className="text-lg">
                  Product Name
                </label>
                <br />
                <input
                  onChange={(e) => handleChange(e)}
                  value={formState?.title}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter product tilte"
                  className={`${inputStyle}`}
                />
              </div>

              <div>
                <label htmlFor="image" className="text-lg">
                  Product Image
                </label>{" "}
                <br />
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="image"
                  id="image"
                  className={`${inputStyle}`}
                />
              </div>

              <div className="">
                <h1 className="text-lg">
                  Category{" "}
                  <span className="text-theSubGreen font-bold">
                    Check associated categories
                  </span>
                </h1>

                <div className="mt-2">
                  {categories?.map((category, index) => (
                    <p key={index} className="">
                      <input
                        onChange={() => handleCheckboxChange(category.name)}
                        type="checkbox"
                        id={`category-${index}`}
                        name="categories"
                        value={category.name}
                        checked={formState.categories?.includes(category.name)}
                      />
                      <label
                        htmlFor={`category-${index}`}
                        className="ml-1 capitalize font-bold"
                      >
                        {category.name}
                      </label>
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="featured">
                  Did you want this product to be featured
                </label>{" "}
                <br />
                <select
                  name="featured"
                  id="featured"
                  className={`${inputStyle}`}
                  onChange={(e) => handleChange(e)}
                  value={formState?.featured}
                >
                  <option value="false">NO</option>
                  <option value="true">YES</option>
                </select>
              </div>
            </div>

            <div>
              <h1 className="text-lg font-bold">Prices</h1>
              <span className="text-theSubGreen font-bold">
                Please fill in each prices related to courtry
              </span>

              <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-2">
                <div>
                  <label htmlFor="priceNgn">Nigeria (NGN)</label> <br />
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formState.priceNgn}
                    type="number"
                    name="priceNgn"
                    id="priceNgn"
                    placeholder="Nigeria Price"
                    className={`${inputStyle}`}
                  />
                </div>
                <div>
                  <label htmlFor="priceUs">United State (USD)</label> <br />
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formState.priceUs}
                    type="number"
                    name="priceUs"
                    id="priceUs"
                    placeholder="United State Price"
                    className={`${inputStyle}`}
                  />
                </div>
                <div>
                  <label htmlFor="priceGhana">Ghana (GHS)</label> <br />
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formState.priceGhana}
                    type="number"
                    name="priceGhana"
                    id="priceGhana"
                    placeholder="Ghana Price"
                    className={`${inputStyle}`}
                  />
                </div>
                <div>
                  <label htmlFor="priceCanada">Canada (CAD)</label> <br />
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formState.priceCanada}
                    type="number"
                    name="priceCanada"
                    id="priceCanada"
                    placeholder="Canada Price"
                    className={`${inputStyle}`}
                  />
                </div>
                <div>
                  <label htmlFor="priceUk">United Kinkdom (GBP)</label> <br />
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formState.priceUk}
                    type="number"
                    name="priceUk"
                    id="priceUk"
                    placeholder="United Kingdom Price"
                    className={`${inputStyle}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {formState?.featured == "true" ? (
            <div className="mt-10 flex flex-col gap-5">
              <div>
                <label htmlFor="collectionTitle" className="text-lg">
                  Collection Title
                </label>{" "}
                <br />
                <input
                  value={formState.collectionTitle}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="collectionTitle"
                  id="collectionTitle"
                  placeholder="Food: Discover Culinary Excellence!"
                  className={`${inputStyle}`}
                />
              </div>
              <div>
                <label htmlFor="priceCanada" className="text-lg">
                  Produst Description for Collection
                </label>{" "}
                <br />
                <textarea
                  value={formState.collectionDescription}
                  onChange={(e) => handleChange(e)}
                  name="collectionDescription"
                  id="collectionDescription"
                  placeholder="Are you ready to embark on a gastronomic journey like no other...."
                  className={`${inputStyle} h-[250px]`}
                ></textarea>
              </div>
            </div>
          ) : (
            ""
          )}

          {errorMessage && (
            <div className="mt-10 text-center text-lg font-bold text-red-500">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-center gap-10 mt-10">
            <button
              disabled={isProcessing}
              onClick={closeForm}
              className={`text-white bg-gray-500 px-10 py-3 font-bold`}
            >
              cancel
            </button>
            <button
              disabled={isProcessing}
              onClick={addProduct}
              className={`bg-theSubGreen text-white px-10 py-3 font-bold`}
            >
              {isProcessing ? (
                <BarsLoader height={20} color={"#354231"} />
              ) : editMode ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
