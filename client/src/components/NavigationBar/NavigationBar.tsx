import React from "react";
import { Navbar, Avatar, Tooltip, Dropdown } from "flowbite-react";
import logo from "../../assets/images/254__1.png";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RegisterRealtor from "../RegisterRealtor/RegisterRealtor";
import { useAuth } from "../../contexts/AuthContext";

export default function NavigationBar() {
  const navigate = useNavigate();
  const { currentUser, logout, realtorUser } = useAuth();

  return (
    <Navbar className="my-auto navbar" fluid={true} rounded={true}>
      <Navbar.Brand role="button" onClick={() => navigate("/")}>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="254 Realtors" />
        <span className="hidden lg:block self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          
        </span>
      </Navbar.Brand>
      <div className="flex items-center md:gap-6 md:order-2">
        {currentUser && (
          <span
            className="hidden md:block"
            role="button"
            onClick={() => navigate("/favorites")}
          >
            <Tooltip content="Favorites">
              <FaHeart color="gray" size={26} />
            </Tooltip>
          </span>
        )}

        {currentUser && (
          <div className="hidden md:flex gap-4">
            {!realtorUser && (
              <div className="hidden md:block">
                <RegisterRealtor />
              </div>
            )}

            <Dropdown
              inline={true}
              label={
                <Avatar
                  className="cursor-pointer"
                  img={currentUser.photoURL}
                  rounded={true}
                  bordered={false}
                  status="online"
                  statusPosition="top-right"
                />
              }
              dismissOnClick={true}
            >
              {realtorUser && (
                <Dropdown.Item
                  onClick={() => navigate("/realtor-admin")}
                  role="button"
                  className="font-semibold whitespace-nowrap"
                >
                  Profile & settings
                </Dropdown.Item>
              )}

              <Dropdown.Item
                onClick={() => logout()}
                role="button"
                className="font-semibold whitespace-nowrap"
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
        {currentUser === null && (
          <span
            onClick={() => navigate("/auth")}
            role="button"
            className="py-2 px-3 rounded-md ring-btn border hidden md:block"
          >
            Sign In
          </span>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link role="button" onClick={() => navigate("/about")}>
          About
        </Navbar.Link>
        <Navbar.Link
          role="button"
          onClick={() => navigate("/real-estate-agents")}
        >
          Realtors
        </Navbar.Link>
        <Navbar.Link role="button" onClick={() => navigate("/blog")}>
          Blog
        </Navbar.Link>
        <Navbar.Link className="block md:hidden">
          {currentUser && (
            <span role="button" onClick={() => navigate("/favorites")}>
              <Tooltip content="Favorites">Favorites</Tooltip>
            </span>
          )}
        </Navbar.Link>
        {currentUser && !realtorUser && (
          <Navbar.Link className="block md:hidden">
            <RegisterRealtor />
          </Navbar.Link>
        )}
        {currentUser && (
          <Navbar.Link
            role="button"
            className="block md:hidden"
            onClick={() => logout()}
          >
            Sign out
          </Navbar.Link>
        )}
        {currentUser && (
          <Navbar.Link className="flex md:hidden">
            <Avatar
              className="cursor-pointer block"
              img={currentUser.photoURL}
              rounded={true}
              bordered={false}
              status="online"
              statusPosition="top-right"
            />
          </Navbar.Link>
        )}
        {currentUser === null && (
          <Navbar.Link className="flex md:hidden">
            <span
              onClick={() => navigate("/auth")}
              role="button"
              className="py-2 px-3 rounded-md ring-btn border"
            >
              Sign In
            </span>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
