import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const CustomButton: FC<Props> = (props) => {
  const { id, label, disabled } = props;

  return (
    <button
      id={id}
      className={`bg-blue-900 text-white font-bold py-2 px-4 rounded-full border border-white ${
        disabled && "bg-gray-700 cursor-not-allowed"
      }`}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;
