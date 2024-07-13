/* eslint-disable react/prop-types */
const InputTag = ({
  inputType,
  inputFor,
  inputPlaceholder,
  inputLabel,
  inputValue,
  inputChange,
}) => {
  return (
    <div>
      <label htmlFor={inputFor} className="capitalize">
        {inputLabel}
      </label>
      <br />
      <input
        value={inputValue}
        onChange={inputChange}
        id={inputFor}
        name={inputFor}
        type={inputType}
        placeholder={inputPlaceholder}
        className="border-[1px] border-theGreen px-5 py-2 rounded-md bg-transparent w-full mt-2"
      />
    </div>
  );
};

export default InputTag;
