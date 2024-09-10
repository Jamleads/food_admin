import { GiWallet } from "react-icons/gi";
import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import PageName from "../components/PageName";
import BoardData from "../components/BoardData";
import { useGetAllCustomersQuery } from "../services/customer";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2 capitalize";
const tData = "border-r border-gray-400 capitalize py-2 truncate";

const Customer = () => {
  const [allCustomers, setAllCustomers] = useState(null);
  const { data, isLoading, isFetching } = useGetAllCustomersQuery();

  useEffect(() => {
    if (!isLoading || !isFetching) {
      setAllCustomers(data?.users);
    }
  }, [data, isLoading, isFetching]);

  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <div className="flex items-center justify-between">
        <PageName pageNmae={"Customers"} />
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 my-10 gap-5 text-theGreen">
        <BoardData
          resourceName={"Total Customers"}
          resourceIcon={<GiWallet />}
          theColor={"text-theSubGreen"}
          resourceTotal={allCustomers?.length}
        />
      </div>

      <div className="">
        <table className="table  divide-y  divide-gray-200 w-full">
          <thead>
            <tr className="text-center bg-theGreen">
              <th className={`${tHead}`}>S/N</th>
              <th className={`${tHead}`}>Name</th>
              <th className={`${tHead}`}>Email</th>
              <th className={`${tHead}`}>Created data</th>
            </tr>
          </thead>

          <tbody>
            {allCustomers?.map((item, index) => (
              <tr
                className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                key={index}
                // onClick={() => setSelectedItem("item")}
              >
                <td className={`${tData}`}>{index + 1}</td>
                <td className={`${tData}`}>{item?.name}</td>
                <td className={`${tData}`}>{item?.email}</td>
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
export default Customer;
