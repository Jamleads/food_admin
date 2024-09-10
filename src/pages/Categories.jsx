import { GiWallet } from "react-icons/gi";
import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../services/categories";
import BarsLoader from "../utilities/BarsLoader";
import { errorToast, successToast } from "../utilities/ToastMessages";
import { reAuthenticate } from "../utilities/reAuthenticate";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2 capitalize";
const tData = "border-r border-gray-400 capitalize py-2 truncate";
const inputStyle = "w-full border-2 border-theGreen px-3 py-1 rounded-lg";

const Categories = () => {
  const { data: categoryData, refetch } = useGetCategoryQuery();
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [categories, setCategories] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({ name: "" });
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData?.product_categorys);
    }
  }, [categoryData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };
  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory(formState);
      successToast("Category added successfully");
      setOpenForm(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  // readyt upoded category
  const readyUpdate = (item) => {
    setEditMode(true);
    setOpenForm(true);
    setFormState(item);
  };
  // update category
  const submitUpdateCategory = async (e) => {
    e.preventDefault();
    const payload = { name: formState.name, id: formState.id };
    try {
      await updateCategory(payload).unwrap();
      successToast("Category updated successfully");
      setOpenForm(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete category
  const deleteACategory = async (item) => {
    if (!item) return;
    try {
      await deleteCategory(item.id).unwrap();
      successToast("Category deleted successfully");
      refetch();
    } catch (error) {
      errorToast("Failed to delete category");
      reAuthenticate(error.message);
    }
  };

  return (
    <>
      {openForm && (
        <div className="modal bg-red-100 p-10">
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className=" text-2xl font-bold">
              {editMode ? "Update Categpry" : "Add category"}
            </p>

            <form action="" className="flex flex-col gap-5">
              <input
                type="text"
                id="name"
                value={formState?.name}
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder="Enter category name"
                className={`${inputStyle}`}
                required
              />

              <div className="flex items-center gap-5">
                <button
                  disabled={isLoading}
                  onClick={() => setOpenForm(false)}
                  className={`bg-secondary-gray px-10 py-3 font-bold`}
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading || isUpdating}
                  onClick={editMode ? submitUpdateCategory : submitCategory}
                  className={`bg-theSubGreen text-white px-10 py-3 font-bold`}
                >
                  {isLoading || isUpdating ? (
                    <BarsLoader height={20} color={"#354231"} />
                  ) : editMode ? (
                    "Update Category"
                  ) : (
                    "Add Category"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {openForm && <div className="modal-backdrop"></div>}

      <>
        <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
          <TopNav />
        </div>

        <div className="flex items-center justify-between">
          <PageName pageNmae={"Categories"} />

          <button
            className=" bg-theSubGreen px-10 py-3"
            onClick={() => {
              setEditMode(false);
              setFormState(null);
              setOpenForm(true);
            }}
          >
            Add category
          </button>
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
                <th className={`${tHead}`}>Action</th>
              </tr>
            </thead>

            <tbody>
              {categories?.map((item, index) => (
                <tr
                  className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                  key={index}
                >
                  <td className={`${tData}`}>{index + 1}</td>
                  <td className={`${tData}`}>{item?.name}</td>
                  <td className={`${tData}`}>
                    <span className="flex items-center justify-center gap-3">
                      <button
                        className="py-2 px-5 bg-theSubGreen cursor-pointer"
                        onClick={() => readyUpdate(item)}
                      >
                        Update
                      </button>
                      <button
                        className="py-2 px-5 bg-red-500 text-white cursor-pointer"
                        onClick={() => deleteACategory(item)}
                      >
                        {isDeleting ? (
                          <BarsLoader color={"#fff"} height={20} width={20} />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};
export default Categories;
