import { GiWallet } from "react-icons/gi";
import BoardData from "../components/BoardData";
import PageName from "../components/PageName";
import TopNav from "./TopNav";
import {
  useCreateDiscountMutation,
  useCreateReferralPercentMutation,
  useGetDiscountQuery,
  useGetReferalPercentQuery,
} from "../services/Rewards";
import { useEffect, useState } from "react";
import BarsLoader from "../utilities/BarsLoader";
import { errorToast, successToast } from "../utilities/ToastMessages";

const tHead = "text-[16px] border-r border-gray-400 text-white py-2 capitalize";
const tData = "border-r border-gray-400 capitalize py-2 truncate";
const inputStyle = "w-full border-2 border-theGreen px-3 py-1 rounded-lg";

const Rewards = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openForm2, setOpenForm2] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);
  const [referralPercent, setReferralPercent] = useState(null);
  const [formState, setFormState] = useState({
    percentage_discounted: "",
    number_of_times_to_be_use: "",
    percentage_to_earn: "",
  });

  //   const [editMode, setEditMode] = useState(false);
  const {
    data: referral,
    isFetching: fetchingReferral,
    refetch: refetchReferral,
  } = useGetReferalPercentQuery();
  const { data, isFetching, refetch } = useGetDiscountQuery();
  const [createDiscount, { isLoading }] = useCreateDiscountMutation();
  const [createReferralPercent, { isLoading: loadingReferral }] =
    useCreateReferralPercentMutation();

  useEffect(() => {
    if (!isFetching) {
      setDiscountCode(data?.discount_code);
    }
    if (!fetchingReferral) {
      setReferralPercent(
        referral?.data?.percentage_to_earn?.percentage_to_earn
      );
    }
  }, [data, isFetching, referral, fetchingReferral]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState({ ...formState, [id]: value });
  };
  const submitCode = async () => {
    if (
      formState?.percentage_discounted === "" ||
      formState?.number_of_times_to_be_use === ""
    ) {
      errorToast("All fields are required");
    } else {
      const payload = {
        percentage_discounted: formState.percentage_discounted,
        number_of_times_to_be_use: formState.number_of_times_to_be_use,
      };
      try {
        await createDiscount(payload).unwrap();
        successToast("Discount code created successfully");
        setOpenForm(false);
        refetch();
        setFormState(null);
      } catch (error) {
        console.log("the error", error);
      }
    }
  };
  const submitReferralPercent = async () => {
    if (formState.percentage_to_earn === "") {
      errorToast("All fields are required");
    } else {
      const payload = {
        percentage_to_earn: formState.percentage_to_earn,
      };
      try {
        const res = await createReferralPercent(payload).unwrap();
        successToast(res?.message);
        refetchReferral();
        setOpenForm2(false);
        setFormState(null);
      } catch (error) {
        errorToast("the error", error);
      }
    }
  };

  return (
    <>
      {openForm && (
        <div className="modal bg-red-100 p-10">
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className=" text-2xl font-bold">Create a discount code</p>

            <form action="" className="flex flex-col gap-5">
              <input
                type="number"
                id="percentage_discounted"
                value={formState?.percentage_discounted}
                name="percentage_discounted"
                onChange={(e) => handleChange(e)}
                placeholder="Percentage to be discounted"
                className={`${inputStyle}`}
                required
              />

              <input
                type="number"
                id="number_of_times_to_be_use"
                value={formState?.number_of_times_to_be_use}
                name="number_of_times_to_be_use"
                onChange={(e) => handleChange(e)}
                placeholder="Number of times to be use"
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
                  disabled={isLoading}
                  onClick={submitCode}
                  className={`bg-theSubGreen text-white px-10 py-3 font-bold`}
                >
                  {isLoading ? (
                    <BarsLoader height={20} color={"#354231"} />
                  ) : (
                    "Create code"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openForm2 && (
        <div className="modal bg-red-100 p-10">
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className=" text-2xl font-bold">Update referral percentage</p>

            <form action="" className="flex flex-col gap-5">
              <input
                type="number"
                id="percentage_to_earn"
                value={formState?.percentage_to_earn}
                name="percentage_to_earn"
                onChange={(e) => handleChange(e)}
                placeholder="Percentage to earn"
                className={`${inputStyle}`}
                required
              />

              <div className="flex items-center gap-5">
                <button
                  disabled={loadingReferral}
                  onClick={() => setOpenForm2(false)}
                  className={`bg-secondary-gray px-10 py-3 font-bold`}
                >
                  Cancel
                </button>
                <button
                  disabled={loadingReferral}
                  onClick={submitReferralPercent}
                  className={`bg-theSubGreen text-white px-10 py-3 font-bold`}
                >
                  {loadingReferral ? (
                    <BarsLoader height={20} color={"#354231"} />
                  ) : (
                    "Update percentage"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(openForm || openForm2) && <div className="modal-backdrop"></div>}
      <>
        <div>
          <div className="nav fixed top-0 right-0 left-0 bg-white shadow-2xl rounded-b-lg px-5 py-2">
            <TopNav />
          </div>

          <div className="flex items-center justify-between">
            <PageName pageNmae={"Rewards"} />
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 my-10 gap-5 text-theGreen">
            <BoardData
              resourceName={"Total discount code"}
              resourceIcon={<GiWallet />}
              theColor={"text-theSubGreen"}
              resourceTotal={discountCode?.length}
            />
            <BoardData
              resourceName={"Referal percentage"}
              resourceIcon={<GiWallet />}
              theColor={"text-theSubGreen"}
              resourceTotal={referralPercent}
            />
          </div>

          <div className="flex items-center gap-10 my-10">
            <div>
              <button
                className="text-white bg-primary-mainGreen px-10 py-3"
                onClick={() => setOpenForm(true)}
              >
                Create discount code
              </button>
            </div>
            <div>
              <button
                className="text-white bg-theSubGreen px-10 py-3"
                onClick={() => setOpenForm2(true)}
              >
                Update referral percentage
              </button>
            </div>
          </div>

          <div className="">
            <table className="table divide-y  divide-gray-200 w-full">
              <thead>
                <tr className="text-center bg-theGreen">
                  <th className={`${tHead}`}>S/N</th>
                  <th className={`${tHead}`}>Code</th>
                  <th className={`${tHead}`}>Percentage discounted</th>
                  <th className={`${tHead}`}>Number of time to be used</th>
                  <th className={`${tHead}`}>Number of time used</th>
                  <th className={`${tHead}`}>Status</th>
                  <th className={`${tHead}`}>Created date</th>
                </tr>
              </thead>

              <tbody>
                {discountCode?.map((item, index) => (
                  <tr
                    className={`text-center border-b cursor-pointer hover:bg-secondary-blue`}
                    key={index}
                  >
                    <td className={`${tData}`}>{index + 1}</td>
                    <td className={`${tData}`}>{item?.code}</td>
                    <td className={`${tData}`}>
                      {item?.percentage_discounted}%
                    </td>
                    <td className={`${tData}`}>
                      {item?.number_of_times_to_be_use}
                    </td>
                    <td className={`${tData}`}>{item?.number_of_times_used}</td>
                    <td className={`${tData} `}>
                      <span
                        className={`${
                          item.status == "Ongoing"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-500"
                        } px-3 py-1 font-bold`}
                      >
                        {item?.status}
                      </span>
                    </td>
                    <td className={`${tData}`}>
                      {new Date(item.created_at).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  );
};

export default Rewards;
