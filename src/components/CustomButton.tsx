import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const CustomButton: FC<Props> = (props) => {
  const { id, label, disabled } = props;

  return (
    <button
      id={id}
      className={`bg-slate-800 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed`}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;
