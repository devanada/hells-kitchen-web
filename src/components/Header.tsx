import {
  FaSun,
  FaMoon,
  FaSignInAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { handleAuth } from "utils/redux/reducers/reducer";
import { ThemeContext } from "utils/context";

const Header = () => {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);
  const checkToken = cookie.token;

  const handleTheme = (mode: string) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
  };

  const handleLogout = async () => {
    removeCookie("token");
    dispatch(handleAuth(false));
    navigate("/login");
    alert("You have been logged out");
  };

  return (
    <nav className="flex bg-zinc-800 w-full py-2.5 px-2 top-0 sticky justify-between items-center">
      <Link id="to-homepage" className="font-bold text-white" to="/">
        Homepage
      </Link>
      <Menu as="div" className="text-left relative inline-block">
        <div>
          <Menu.Button className="bg-black rounded-md font-medium bg-opacity-20 text-sm text-white w-full py-2 px-4 inline-flex justify-center hover:bg-opacity-30 focus:outline-none focus-visible:ring-white focus-visible:ring-2 focus-visible:ring-opacity-75">
            <FaChevronDown
              className="h-5 text-violet-200 w-5 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="divide-y bg-white rounded-md divide-gray-100 shadow-lg ring-black mt-2 origin-top-right right-0 ring-1 ring-opacity-5 w-56 absolute dark:bg-zinc-700 focus:outline-none">
            <div className="py-1 px-1">
              {checkToken && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-blue-700 text-white"
                          : "text-gray-900 dark:text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      id="to-profile"
                      onClick={() => navigate("/profile")}
                      // TODO: Change the url based on username /u/:username
                    >
                      {active ? (
                        <FaUserCircle
                          className="h-5 mr-2 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaUserCircle
                          className="h-5 mr-2 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Profile
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-blue-700 text-white"
                        : "text-gray-900 dark:text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    id="btn-mode"
                    onClick={() =>
                      handleTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <FaSun className="h-5 mr-2 w-5" aria-hidden="true" />
                    ) : (
                      <FaMoon className="h-5 mr-2 w-5" aria-hidden="true" />
                    )}
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="py-1 px-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-blue-700 text-white"
                        : "text-gray-900 dark:text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    id="btn-logout"
                    onClick={() =>
                      checkToken ? handleLogout() : navigate("/login")
                    }
                  >
                    {checkToken ? (
                      <FaSignOutAlt
                        className="h-5 mr-2 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaSignInAlt
                        className="h-5 mr-2 w-5"
                        aria-hidden="true"
                      />
                    )}
                    {checkToken ? "Logout" : "Login"}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
};

export default Header;
