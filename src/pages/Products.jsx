import { GiWallet } from "react-icons/gi";
import { useState } from "react";
import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2 capitalize";
const tData = "border-r border-gray-400 capitalize py-2 truncate";
const products = [
  {
    id: 1,
    title: "Allspice Spice",
    priceNgn: "10000.00",
    priceUs: "40.00",
    priceUk: "30.00",
    priceGhana: "140.00",
    priceCanada: "300.00",
    nigeriaCode: "NGN",
    ghanaCode: "GHS",
    ukCode: "GBP",
    usCode: "USD",
    canadaCode: "CAD",
    categories: ["Condiments", "Spicies"],
    image: "AllspiceSpice",
    featured: "true",
    collectionTitle: "Food: Discover Culinary Excellence!",
    collectionDescription:
      "Are you ready to embark on a gastronomic journey like no other? Look no further than Gourmet Delights – where every dish is a masterpiece crafted to perfection. Our chefs blend passion and creativity to bring you an exquisite dining experience that tantalizes your taste buds.",
    created_at: "2024-05-20T11:58:02.000Z",
  },
  {
    id: 2,
    title: "Allspice Spice",
    priceNgn: "10000.00",
    priceUs: "40.00",
    priceUk: "30.00",
    priceGhana: "140.00",
    priceCanada: "300.00",
    nigeriaCode: "NGN",
    ghanaCode: "GHS",
    ukCode: "GBP",
    usCode: "USD",
    canadaCode: "CAD",
    categories: ["Condiments", "Spicies"],
    image: "AllspiceSpice",
    featured: "false",
    collectionTitle: "Food: Discover Culinary Excellence!",
    collectionDescription:
      "Are you ready to embark on a gastronomic journey like no other? Look no further than Gourmet Delights – where every dish is a masterpiece crafted to perfection. Our chefs blend passion and creativity to bring you an exquisite dining experience that tantalizes your taste buds.",
    created_at: "2024-05-20T12:08:16.000Z",
  },
];

// TODO: VEW MORE  OF PRODUCT DETAILS WITH ACTION
// TODO: ADD PRODUCT FORM

const Products = () => {
  const [allProducts, setAllProducts] = useState(products);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <div className="flex items-center justify-between">
        <PageName pageNmae={"Products"} />

        <button className=" bg-theSubGreen px-10 py-3">Add New Product</button>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 my-10 gap-5 text-theGreen">
        <BoardData
          resourceName={"Total Products"}
          resourceIcon={<GiWallet />}
          theColor={"text-theSubGreen"}
        />
      </div>

      <div className="">
        <table className="table  divide-y  divide-gray-200 w-full">
          <thead>
            <tr className="text-center bg-theGreen">
              <th className={`${tHead}`}>S/N</th>
              <th className={`${tHead}`}>Name</th>
              <th className={`${tHead}`}>Categories</th>
              <th className={`${tHead}`}>Collection Title</th>
              <th className={`${tHead}`}>Created data</th>
            </tr>
          </thead>

          <tbody>
            {allProducts?.map((item, index) => (
              <tr
                className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                key={index}
                onClick={() => setSelectedItem("item")}
              >
                <td className={`${tData}`}>{index + 1}</td>
                <td className={`${tData}`}>{item?.title}</td>
                <td className={`${tData}`}>{item.categories.join(", ")}</td>
                <td className={`${tData}`}>{item?.collectionTitle}</td>
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

export default Products;
