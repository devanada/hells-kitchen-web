import { FC, InputHTMLAttributes } from "react";

const CustomInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { placeholder } = props;

  return (
    <div className="flex flex-col">
      <label className="text-dark dark:text-light">{placeholder}</label>
      <input
        className="border rounded-lg bg-slate-200 text-dark p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 disabled:bg-slate-500 border-slate-300"
        {...props}
      />
    </div>
  );
};

export default CustomInput;
