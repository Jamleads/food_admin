import BoardData from "../components/BoardData";
import PageName from "../components/PageName";
import TopNav from "./TopNav";
import { GiWallet, GiMilkCarton } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { MdShoppingCartCheckout } from "react-icons/md";

const Dashboard = () => {
  return (
    <>
      <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
        <TopNav />
      </div>

      <div className="flex flex-col gap-10">
        <PageName pageNmae={"Dashboard"} />
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 my-10 gap-5 text-theGreen">
        <BoardData
          resourceName={"Total Revenue"}
          resourceIcon={<GiWallet />}
          theColor={"text-theSubGreen"}
        />

        <BoardData
          resourceName={"Pending Orders"}
          resourceIcon={<MdShoppingCartCheckout />}
          theColor={"text-[#FFC82C]"}
        />

        <BoardData
          resourceName={"Total Product"}
          resourceIcon={<GiMilkCarton />}
          theColor={"text-[#2C5AFF]"}
        />

        <BoardData
          resourceName={"Total Customer"}
          resourceIcon={<HiUserGroup />}
          theColor={"text-red-500"}
        />
      </div>
    </>
  );
};

export default Dashboard;
