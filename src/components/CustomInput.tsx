import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register?: any;
  error?: string;
}

const CustomInput: FC<Props> = (props) => {
  const { placeholder, register, name, error } = props;

  return (
    <div className="flex flex-col">
      <label className="text-dark dark:text-light">{placeholder}</label>
      <input
        className="border rounded-lg bg-slate-200 border-slate-300 text-dark p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 disabled:bg-slate-500"
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="font-light text-sm text-red-500 break-words">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

export default CustomInput;
