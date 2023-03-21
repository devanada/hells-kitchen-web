import { FC, InputHTMLAttributes } from "react";

const CustomInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="border rounded-lg bg-slate-200 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
      {...props}
    />
  );
};

export default CustomInput;
