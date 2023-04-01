import { Link } from "react-router-dom";
import { FC } from "react";

interface Props {
  image: string;
  username: string;
  name: string;
}

const Card: FC<Props> = (props) => {
  const { image, name, username } = props;

  return (
    <Link
      className="rounded-xl flex flex-col text-light px-3 py-6 gap-1 items-center bg-dark/20 dark:bg-light/10 hover:bg-dark/30 hover:dark:bg-light/20 transition ease-in-out duration-300"
      to={`/u/${username}`}
    >
      <img
        src={image}
        alt={`${username} picture`}
        className="rounded-full w-28 aspect-square"
      />
      <h1 className="font-bold text-dark text-base text-center tracking-wider dark:text-light">
        {name}
      </h1>
    </Link>
  );
};

export default Card;
