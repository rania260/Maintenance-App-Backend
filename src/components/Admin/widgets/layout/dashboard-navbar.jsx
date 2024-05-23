import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../../../contexts/AuthContext";

export function DashboardNavbar() {
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [notifications, setNotifications] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/notif/notifications", {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        console.log("notification ", response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 3000);

    return () => clearInterval(intervalId);
  }, [auth.accessToken, cookies.jwt]);
  

  const handleLogout = async () => {
    try {
        const response = await axios.post(
            "http://localhost:5001/auth/logout"
        );
        console.log("response",response)

        // Remove JWT token from cookies
        removeCookie("jwt", { path: "/" });

      navigate ('/login')
        // Optionally, clear any user-related data from state or local storage
    } catch (error) {
        console.error("Error logging out:", error);
        // Handle logout error
    }
};


  
  return (
    <Navbar>
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Link to={`/${layout}`}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
            >
              {layout}
            </Typography>
          </Link>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {page}
          </Typography>

          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="#">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Profile
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>

          <Menu>
            <MenuHandler>
              <div className="relative">
                <IconButton variant="text" color="blue-gray">
                  <BellIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
                {notifications.length > 0 && (
                  <span className="bg-red-500 rounded-full text-white text-xs px-2 py-1 absolute -top-3 -right-3">
                    {notifications.length}
                  </span>
                )}
              </div>
            </MenuHandler>
            <MenuList className="w-max border-0">
              {notifications.map((notification, index) => (
                <MenuItem key={index} className="flex items-center gap-3">
           
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >           
                    Demand-Add Send from <strong> {notification.sender.firstname}</strong> 

                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center gap-1 text-xs font-normal opacity-60"
                    >
                      <ClockIcon className="h-3.5 w-3.5" /> {notification.time}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <IconButton variant="text" color="blue-gray">
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
              onClick={handleLogout}
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              Logout
            </Button>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
