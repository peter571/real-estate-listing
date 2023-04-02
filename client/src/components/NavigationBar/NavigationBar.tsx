import React from "react";
import { Navbar, Avatar, Tooltip, Dropdown } from "flowbite-react";
import logo from "../../assets/images/254__1.png";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RegisterRealtor from "../RegisterRealtor/RegisterRealtor";
import { useAuth } from "../../contexts/AuthContext";

export default function NavigationBar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <Navbar className="my-auto navbar" fluid={true} rounded={true}>
      <Navbar.Brand role="button" onClick={() => navigate("/")}>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="254 Realtors" />
        <span className="hidden sm:block self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          254 Realtors
        </span>
      </Navbar.Brand>
      <div className="flex items-center gap-6 md:order-2">
        <span role="button" onClick={() => navigate("/favorites")}>
          <Tooltip content="Favorites">
            <FaHeart color="gray" size={26} />
          </Tooltip>
        </span>
        {currentUser && (
          <>
            <RegisterRealtor />
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
              dismissOnClick={false}
            >
              <Dropdown.Item
                onClick={() => logout()}
                role="button font-semibold"
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </>
        )}
        {currentUser === null && (
          <span
            onClick={() => navigate("/auth")}
            role="button"
            className="py-2 px-3 rounded-md ring-btn border"
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
          Real Estate Agents
        </Navbar.Link>
        <Navbar.Link role="button" onClick={() => navigate("/blog")}>
          Blog
        </Navbar.Link>
        <Navbar.Link role="button" onClick={() => logout()}>
          Sign out
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
