import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";
import { GiMilkCarton, GiWallet } from "react-icons/gi";
import { MdShoppingCartCheckout } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../services/order";
import { useNavigate } from "react-router-dom";
import BarsLoader from "../utilities/BarsLoader";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2";
const tData = "border-r border-gray-400 capitalize py-2 truncate";

const Order = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(null);
  console.log("at first", tableData);
  const [allOrders, setAllOrders] = useState(null);
  const { data, isLoading, isFetching } = useGetAllOrdersQuery();

  const activeOrder = allOrders?.filter(
    (order) => order.status == "Processing" || order.status == "processing"
  );
  const pendingOrder = allOrders?.filter(
    (order) => order.status == "Pending" || order.status == "pending"
  );
  const completedOrder = allOrders?.filter(
    (order) => order.status == "completed"
  );
  const cancelledOrder = allOrders?.filter(
    (order) => order.status == "Cancelled" || order.status == "cancelled"
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setAllOrders(data?.orders);
    }
  }, [data, isFetching, isLoading]);

  const pushSort = (data) => {
    const sortedData = [...data].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setTableData(sortedData);
  };

  return (
    <>
      {isFetching && (
        <div className="modal flex items-center justify-center !bg-transparent">
          <BarsLoader height={50} color={"#fff"} />
        </div>
      )}
      {isFetching && <div className="modal-backdrop"></div>}

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
            resourceTotal={allOrders?.length}
            // action={() => setTableData(allOrders)}
            action={() => pushSort(allOrders)}
          />
          <BoardData
            resourceName={"Active Orders"}
            resourceIcon={<GiWallet />}
            theColor={"text-theSubGreen"}
            resourceTotal={activeOrder?.length}
            // action={() => setTableData(activeOrder)}
            action={() => pushSort(activeOrder)}
          />

          <BoardData
            resourceName={"Pending/Failed Orders"}
            resourceIcon={<MdShoppingCartCheckout />}
            theColor={"text-[#FFC82C]"}
            resourceTotal={pendingOrder?.length}
            // action={() => setTableData(pendingOrder)}
            action={() => pushSort(pendingOrder)}
          />

          <BoardData
            resourceName={"Completed Orders"}
            resourceIcon={<GiMilkCarton />}
            theColor={"text-[#2C5AFF]"}
            resourceTotal={completedOrder?.length}
            // action={() => setTableData(completedOrder)}
            action={() => pushSort(completedOrder)}
          />

          <BoardData
            resourceName={"Canceled Orders"}
            resourceIcon={<HiUserGroup />}
            theColor={"text-red-500"}
            resourceTotal={cancelledOrder?.length}
            // action={() => setTableData(cancelledOrder)}
            action={() => pushSort(cancelledOrder)}
          />
        </div>

        <div className="">
          <table className="table  divide-y  divide-gray-200 w-full">
            <thead>
              <tr className="text-center bg-theGreen">
                <th className={`${tHead}`}>S/N</th>
                <th className={`${tHead}`}>Customer Name</th>
                <th className={`${tHead}`}>Customer Email</th>

                <th className={`${tHead}`}>Order Status</th>
                <th className={`${tHead}`}>Total Price</th>

                <th className={`${tHead}`}>Order Date</th>
              </tr>
            </thead>

            <tbody>
              {tableData?.map((item, index) => (
                <tr
                  className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                  key={index}
                  onClick={() => navigate(`/order/${item.id}`)}
                >
                  <td className={`${tData}`}>{index + 1}</td>

                  <td className={`${tData}`}>{item?.name}</td>
                  <td className={`${tData}`}>{item?.email}</td>
                  <td className={`${tData}`}>{item?.status}</td>
                  <td className={`${tData}`}>{item?.total}</td>

                  <td className={`${tData}`}>
                    {new Date(item.date).toDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tableData ? (
            ""
          ) : (
            <p className=" text-2xl font-bold text-center text-red-500">
              Kindly click each board to see order details
            </p>
          )}
        </div>
      </>
    </>
  );
};

export default Order;
