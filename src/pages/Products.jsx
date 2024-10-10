/* eslint-disable react/prop-types */
import { GiWallet } from "react-icons/gi";
import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";
import ProductForm from "../components/ProductForm";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "../services/product";
import { errorToast, successToast } from "../utilities/ToastMessages";
import ProductDetails from "../components/ProductDetails";
import { useGetCategoryQuery } from "../services/categories";
import Select, { components } from "react-select";
import { customStyles } from "../utilities/CustomUtili";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2 capitalize";
const tData = "border-r border-gray-400 capitalize py-2 truncate";

// TODO: VEW MORE  OF PRODUCT DETAILS WITH ACTION

const Products = () => {
  const { data: categoryData } = useGetCategoryQuery();
  const { data, isFetching, refetch } = useGetAllProductQuery();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  const [form, setForm] = useState(false);
  const [searchItems, setSearchItems] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    priceNgn: "",
    priceUs: "",
    priceUk: "",
    priceGhana: "",
    priceCanada: "",
    categories: [],
    collectionTitle: "",
    collectionDescription: "",
    featured: "false",
  });

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData?.product_categorys);
    }
  }, [categoryData]);

  useEffect(() => {
    if (!isFetching) {
      setAllProducts(data?.products);
    }
  }, [data, isFetching]);
  const openForm = (e) => {
    e.preventDefault();
    setForm(!form);
    editmode(false);
    setDetailsModal(false);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };
  const handleCheckboxChange = (value) => {
    setFormState((prevState) => {
      const updatedCategories = prevState.categories.includes(value)
        ? prevState.categories.filter((item) => item !== value)
        : [...prevState.categories, value];

      return {
        ...prevState,
        categories: updatedCategories,
      };
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const openProductDetails = (item) => {
    setSelectedItem(item);
    setDetailsModal(true);
  };
  useEffect(() => {
    if (!editmode) return;
    setFormState(selectedItem);
    const selectedCategories = selectedItem?.categories || [];
    setFormState((prevState) => ({
      ...prevState,
      categories: selectedCategories,
    }));
  }, [editmode, selectedItem]);

  // Add and update
  const addProduct = async (e) => {
    e.preventDefault();
    const payload = {
      title: formState.title,
      priceNgn: formState.priceNgn,
      priceUs: formState.priceUs,
      priceUk: formState.priceUk,
      priceGhana: formState.priceGhana,
      priceCanada: formState.priceCanada,
      categories: formState.categories,
      collectionTitle: formState.collectionTitle,
      collectionDescription: formState.collectionDescription,
      featured: formState.featured,
    };
    const formData = new FormData();
    selectedFile && formData.append("image", selectedFile);
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((element) => {
          formData.append(`${key}[]`, element);
        });
      } else {
        formData.append(key, value);
      }
    });
    try {
      if (editmode) {
        await updateProduct({ data: formData, id: formState.id }).unwrap();
        successToast("Product updated successfully");
      } else {
        await createProduct(formData).unwrap();
        successToast("Product added successfully");
      }
      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } catch (error) {
      setErrorMessage(error.data?.message);
      errorToast(error?.data?.message);
    }
  };
  const deleteSelectedProduct = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct(selectedItem.id).unwrap();
      successToast("Product deleted successfully");
      setDetailsModal(false);
      refetch();
    } catch (error) {
      setErrorMessage(error.data?.message);
      errorToast(error?.data?.message);
    }
  };
  useEffect(() => {
    if (!allProducts) return;
    const newArry = allProducts?.map((item) => ({
      label: `${item?.title}`,
      ...item,
    }));
    setSearchItems(newArry);
  }, [allProducts]);

  const handleProductSearch = (item) => {
    openProductDetails(item);
  };

  return (
    <>
      {detailsModal && (
        <div className="modal">
          <ProductDetails
            selectedProduct={selectedItem}
            readyEditForm={() => {
              setEditmode(true);
              setDetailsModal(false);
              setForm(!form);
            }}
            closeForm={() => {
              setDetailsModal(false);
              setEditmode(false);
            }}
            isProcessing={deleting}
            deleteProduct={deleteSelectedProduct}
          />
        </div>
      )}
      {detailsModal && <div className="modal-backdrop"></div>}

      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      {!form ? (
        <div>
          <div className="flex items-center justify-between">
            <PageName pageNmae={"Products"} />

            <button className=" bg-theSubGreen px-10 py-3" onClick={openForm}>
              Add New Product
            </button>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 my-10 gap-5 text-theGreen">
            <BoardData
              resourceName={"Total Products"}
              resourceIcon={<GiWallet />}
              theColor={"text-theSubGreen"}
              resourceTotal={allProducts?.length}
            />
            <BoardData
              resourceName={"Featured Products"}
              resourceIcon={<GiWallet />}
              theColor={"text-theSubGreen"}
              resourceTotal={allProducts?.length}
            />
          </div>

          <div className="">
            <div className=" bg-theGreen py-2 flex items-center justify-center">
              <div className="flex items-center lg:w-3/5 w-full ">
                <div className="search w-full flex items-center justify-between border-[1px] border-secondary">
                  <div className="w-[40px] h-[40px] bg-primary flex items-center justify-center">
                    {/* <img src={SearchIcon} alt="" /> */}
                  </div>
                  <Select
                    className="w-full"
                    options={searchItems}
                    styles={customStyles}
                    components={{ SingleValue: CustomValue2 }}
                    onChange={(e) => handleProductSearch(e)}
                    placeholder="Search for products..."
                  />
                </div>
              </div>
            </div>
            <table className="table  divide-y  divide-gray-200 w-full">
              <thead>
                <tr className="text-center bg-theGreen">
                  <th className={`${tHead}`}>S/N</th>
                  <th className={`${tHead}`}>Name</th>
                  <th className={`${tHead}`}>Categories</th>
                  <th className={`${tHead}`}>Featured</th>
                  <th className={`${tHead}`}>Created data</th>
                </tr>
              </thead>

              <tbody>
                {allProducts?.map((item, index) => (
                  <tr
                    className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                    key={index}
                    onClick={() => openProductDetails(item)}
                  >
                    <td className={`${tData}`}>{index + 1}</td>
                    <td className={`${tData}`}>{item?.title}</td>
                    <td className={`${tData}`}>{item.categories.join(", ")}</td>
                    <td className={`${tData}`}>{item?.featured}</td>
                    <td className={`${tData}`}>
                      {new Date(item.created_at).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <ProductForm
          errorMessage={errorMessage}
          isProcessing={isLoading || updating}
          closeForm={() => window.location.reload()}
          editMode={editmode}
          handleChange={handleChange}
          formState={formState}
          addProduct={addProduct}
          handleFileChange={handleFileChange}
          categories={categories}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
    </>
  );
};
export default Products;

const CustomValue2 = (props) => {
  return (
    <components.SingleValue {...props}>
      <div className="" value={props.data.label}>
        <div className="leading-6">
          <p>{props.data.title}</p>
        </div>
      </div>
    </components.SingleValue>
  );
};
