import { FC, ReactNode } from "react";

import Header from "@components/Header";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="flex flex-col h-screen w-full overflow-auto bg-light dark:bg-dark">
      <Header />
      <div className="bg-center bg-cover bg-no-repeat flex flex-col h-full container p-3">
        {children}
      </div>
    </div>
  );
};

export default Layout;
