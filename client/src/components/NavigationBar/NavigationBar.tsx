import React from "react";
import { Navbar, Button } from "flowbite-react";
import logo from "../../assets/images/254__1.png";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  return (
    <Navbar className="my-auto bg-bodycolor" fluid={true} rounded={true}>
      <Navbar.Brand role="button" onClick={() => navigate("/")}>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="254 Realtors" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          254 Realtors
        </span>
      </Navbar.Brand>
      <div className="flex items-center gap-6 md:order-2">
        <span role="button">
          <FaHeart color="gray" size={26} />
        </span>
        <Button onClick={() => navigate("/auth")} className="ring-btn">
          Register as Realtor
        </Button>
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
      </Navbar.Collapse>
    </Navbar>
  );
}
