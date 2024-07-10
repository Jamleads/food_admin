/* eslint-disable react/prop-types */
import { Bars } from "react-loader-spinner";
const BarsLoader = ({ height, width, color }) => {
  return (
    <span className="relative flex items-center justify-center w-full ">
      <Bars
        height={height}
        width={width}
        color={color}
        ariaLabel="bars-loading"
        visible={true}
        className="flex items-center justify-center"
      />
    </span>
  );
};

export default BarsLoader;
