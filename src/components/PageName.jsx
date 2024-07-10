/* eslint-disable react/prop-types */
const PageName = ({ pageNmae }) => {
  return (
    <div className="pageName">
      <h1 className="text-3xl font-bold text-primary-mainBlue ml-5 capitalize">
        {pageNmae}
      </h1>
    </div>
  );
};

export default PageName;
