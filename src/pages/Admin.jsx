import { GiWallet } from "react-icons/gi";
import { useState } from "react";
import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2 capitalize";
const tData = "border-r border-gray-400 capitalize py-2 truncate";

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

const Admin = () => {
  const [allCategory, setAllCategory] = useState(product_categorys);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <div className="flex items-center justify-between">
        <PageName pageNmae={"Categories"} />

        <button className=" bg-theSubGreen px-10 py-3">Add category</button>
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
            {allCategory?.map((item, index) => (
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
    </>
  );
};
export default Admin;
