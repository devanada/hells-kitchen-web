import { FC, ReactNode } from "react";

import Header from "@components/Header";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="flex flex-col h-screen w-full overflow-auto">
      <Header />
      <div className="bg-white bg-center bg-cover bg-no-repeat flex flex-col h-full w-full p-3 dark:bg-black">
        {children}
      </div>
    </div>
  );
};

export default Layout;
