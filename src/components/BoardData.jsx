/* eslint-disable react/prop-types */
import CountUp from "react-countup";

const BoardData = ({
  imgStyle,
  resourceIcon,
  resourceTotal,
  resourceName,
  textStyle,
  theColor,
}) => {
  return (
    <div className="bg-white flex items-center justify-around py-5 rounded-xl">
      <div className="flex flex-col items-center justify-center gap-5">
        <div
          className={`w-[60px] h-[60px] rounded-full ${imgStyle} bg-theGreen flex items-center justify-center`}
        >
          <p className={`${theColor} text-3xl`}>{resourceIcon}</p>
        </div>
        <p
          className={`resourceTextColor ${theColor} font-extrabold ${textStyle} text-lg`}
        >
          {resourceName}
        </p>
      </div>

      <div
        className={`flex items-center justify-center font-bold text-2xl ${theColor}`}
      >
        <h1>
          <CountUp start={0} end={resourceTotal} />
        </h1>
      </div>
    </div>
  );
};

export default BoardData;
