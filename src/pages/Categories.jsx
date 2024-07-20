import { GiWallet } from "react-icons/gi";
import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";
import {
  useAddCategoryMutation,
  useGetCategoryQuery,
} from "../services/categories";
import BarsLoader from "../utilities/BarsLoader";
import { successToast } from "../utilities/ToastMessages";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2 capitalize";
const tData = "border-r border-gray-400 capitalize py-2 truncate";
const inputStyle = "w-full border-2 border-theGreen px-3 py-1 rounded-lg";

const product_categorys = [
  {
    id: 4,
    name: "another category",
  },
  {
    id: 1,
    name: "new category",
  },
];

// TODO: VEW MORE  OF PRODUCT DETAILS WITH ACTION
// TODO: THE FORM FOR ADDING CATEGORY

const Categories = () => {
  const { data: categoryData, refetch } = useGetCategoryQuery();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({ name: "" });

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData?.product_categorys);
    }
  }, [categoryData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory(formState);
      successToast("Category added successfully");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <div className="flex items-center justify-between">
        <PageName pageNmae={"Categories"} />

        <button className=" bg-theSubGreen px-10 py-3">Add category</button>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 my-10 gap-5 text-theGreen">
        <BoardData
          resourceName={"Total Category"}
          resourceIcon={<GiWallet />}
          theColor={"text-theSubGreen"}
          resourceTotal={categories?.length}
        />
        {/* TODO: BOARD  DATA WITH THE NUMBER OF PRODUCT IN EACH CATEGORY */}
      </div>

      <div className="">
        <table className="table  divide-y  divide-gray-200 w-full">
          <thead>
            <tr className="text-center bg-theGreen">
              <th className={`${tHead}`}>S/N</th>
              <th className={`${tHead}`}>Name</th>
              <th className={`${tHead}`}>Created data</th>
            </tr>
          </thead>

          <tbody>
            {categories?.map((item, index) => (
              <tr
                className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                key={index}
                onClick={() => setSelectedItem("item")}
              >
                <td className={`${tData}`}>{index + 1}</td>
                <td className={`${tData}`}>{item?.name}</td>
                <td className={`${tData}`}>
                  {new Date(item.created_at).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 bg-red-100 p-10 w-[40%]">
        <p>Add category</p>
        <form action="">
          <input
            type="text"
            id="name"
            value={formState.name}
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder="Enter category name"
            className={`${inputStyle}`}
            required
          />
          <button
            disabled={isLoading}
            onClick={submitCategory}
            className={`bg-theSubGreen text-white px-10 py-3 font-bold`}
          >
            {isLoading ? (
              <BarsLoader height={20} color={"#354231"} />
            ) : editMode ? (
              "Update Category"
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </div>
    </>
  );
};
export default Categories;
