import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";
import { GiMilkCarton, GiWallet } from "react-icons/gi";
import { MdShoppingCartCheckout } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../services/order";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2";
const tData = "border-r border-gray-400 capitalize py-2 truncate";
const dummyOrders = [
  {
    id: 15,
    user_id: 1,
    date: "2024-05-23T14:40:38.000Z",
    status: "Pending",
    total: "23000.00",
    name: "new customer",
    email: "new@user.com",
    phone: null,
  },
  {
    id: 16,
    user_id: 3,
    date: "2024-05-23T14:41:16.000Z",
    status: "Pending",
    total: "23000.00",
    name: "new customer",
    email: "new@user2.com",
    phone: null,
  },
];

// TODO: order more information component available
const Order = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [allOrders, setAllOrders] = useState(dummyOrders);

  const { data, isLoading, isFetching, reFetch } = useGetAllOrdersQuery();
  useEffect(() => {
    if (!isLoading && !isFetching) {
      console.log("the all order fetched", data);
      // setAllOrders(data);
    }
  }, [data, isFetching, isLoading]);

  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <div className="flex flex-col gap-10">
        <PageName pageNmae={"Orders"} />
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 my-10 gap-5 text-theGreen">
        <BoardData
          resourceName={"Total Orders"}
          resourceIcon={<GiWallet />}
          theColor={"text-theSubGreen"}
        />

        <BoardData
          resourceName={"Pending Orders"}
          resourceIcon={<MdShoppingCartCheckout />}
          theColor={"text-[#FFC82C]"}
        />

        <BoardData
          resourceName={"Completed/Delivered Orders"}
          resourceIcon={<GiMilkCarton />}
          theColor={"text-[#2C5AFF]"}
        />

        <BoardData
          resourceName={"Canceled Orders"}
          resourceIcon={<HiUserGroup />}
          theColor={"text-red-500"}
        />
      </div>

      <div className="">
        <table className="table  divide-y  divide-gray-200 w-full">
          <thead>
            <tr className="text-center bg-theGreen">
              <th className={`${tHead}`}>S/N</th>
              <th className={`${tHead}`}>Order Status</th>
              <th className={`${tHead}`}>Total Price</th>
              <th className={`${tHead}`}>Customer Name</th>
              <th className={`${tHead}`}>Customer Email</th>
              <th className={`${tHead}`}>Customer Phone</th>
              <th className={`${tHead}`}>Order Date</th>
            </tr>
          </thead>

          <tbody>
            {allOrders?.map((item, index) => (
              <tr
                className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                key={index}
                onClick={() => setSelectedItem("item")}
              >
                <td className={`${tData}`}>{index + 1}</td>

                <td className={`${tData}`}>{item?.status}</td>
                <td className={`${tData}`}>{item?.total}</td>
                <td className={`${tData}`}>{item?.name}</td>
                <td className={`${tData}`}>{item?.email}</td>
                <td className={`${tData}`}>
                  {item?.phone ? item?.phone : "null "}
                </td>
                <td className={`${tData}`}>
                  {new Date(item.date).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
