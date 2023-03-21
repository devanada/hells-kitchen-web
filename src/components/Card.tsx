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
    <div className="rounded-xl flex flex-col text-white p-2 gap-1 items-center">
      <img
        src={image}
        alt={`${username} picture`}
        className="rounded-full w-28 aspect-square"
      />
      <Link to={`/u/${username}`}>
        <h1 className="font-bold text-black text-base text-center tracking-wider dark:text-white">
          {name}
        </h1>
      </Link>
      <p className="text-black text-sm dark:text-white">{username}</p>
    </div>
  );
};

export default Card;
