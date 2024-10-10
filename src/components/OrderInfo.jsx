import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneOrderInfoQuery,
  useUpdateOrderStatusMutation,
} from "../services/order";
import TopNav from "../pages/TopNav";
import { BsArrowLeft } from "react-icons/bs";
import { successToast } from "../utilities/ToastMessages";
const tHead = "text-[16px] border-r border-gray-400 text-white py-2";
const tData = "border-r border-gray-400 capitalize py-2 truncate";

const OrderInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetOneOrderInfoQuery(id);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const orderDetails = data?.order;

  const updateOrder = async (newStatus) => {
    const data = {
      status: newStatus,
    };
    try {
      await updateOrderStatus({ id: id, data: data }).unwrap();
      successToast("Order status updated successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <div>
        <div className="flex items-center gap-3">
          <p
            className="border-[1px] border-black p-2 cursor-pointer rounded-lg"
            onClick={() => navigate(-1)}
          >
            <BsArrowLeft />
          </p>
          <p className=" text-2xl font-bold">
            Order <span>{orderDetails?.order_id || "#12345"}</span>
          </p>
        </div>

        <div className="mt-10 rounded-lg border-black border-[1px] p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className=" text-2xl font-bold">
                Order <span>{orderDetails?.order_id || "#12345"}</span>
              </p>
              <span
                className={`bg-blue-100 px-3 py-1 text-xs text-blue-500 font-bold rounded-lg`}
              >
                {orderDetails?.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* {orderDetails?.status == "Pending" && ( */}
              <button
                title="if payment was confirmed and order is still in pending state"
                onClick={() => updateOrder("Processing")}
                className="px-3 py-2 rounded-lg bg-yellow-400 text-xs"
              >
                Mark Processing
              </button>
              {/* )} */}

              {/* {orderDetails?.status == "Processing" && ( */}
              <button
                title="if order is already delivered or sent for delivery"
                onClick={() => updateOrder("Completed")}
                className="px-3 py-2 rounded-lg bg-green-400 text-xs"
              >
                Mark Completed
              </button>
              {/* )} */}

              <button
                title="if order is not valied"
                onClick={() => updateOrder("Cancelled")}
                className="px-3 py-2 rounded-lg bg-red-400 text-xs"
              >
                Mark Cancelled
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className=" text-xs bg-blue-100 py-1 px-3 rounded-lg">
              Paid on: {new Date(orderDetails?.created_at).toDateString()}
            </span>
            <span className=" text-xs bg-blue-100 py-1 px-3 rounded-lg">
              Placed on: {new Date(orderDetails?.created_at).toDateString()}
            </span>
            <span className=" text-xs bg-blue-100 py-1 px-3 rounded-lg">
              Updated on: {new Date(orderDetails?.date).toDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-5">
          <div className="mt-10 rounded-lg border-black border-[1px] p-3 w-2/3">
            <table className="table  divide-y  divide-gray-200 w-full">
              <thead>
                <tr className="text-center bg-theGreen">
                  <th className={`${tHead}`}>Item</th>
                  <th className={`${tHead}`}>Quantity</th>
                </tr>
              </thead>

              <tbody>
                {orderDetails?.products?.map((item, index) => (
                  <tr
                    className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                    key={index}
                  >
                    <td className={`${tData}`}>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-[200px] h-[100px]">
                          <img src={item.imageUrl} alt="" />
                        </div>
                        <p>{item.title}</p>
                      </div>
                    </td>

                    <td className={`${tData}`}>{item?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-lg border-black border-[1px] p-3 w-1/3">
            <p>CUSTOMER DETAILS</p>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p>Name</p>
                <p className=" text-sm font-light">{"Jakees test"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
