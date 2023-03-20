import { ReactNode } from "react";

import Header from "components/Header";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen w-full overflow-auto">
      <Header />
      <div className="bg-white bg-center bg-cover bg-no-repeat flex flex-col h-full w-full dark:bg-black">
        {children}
      </div>
    </div>
  );
}

export default Layout;
