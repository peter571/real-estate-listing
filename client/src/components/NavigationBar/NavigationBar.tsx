import React from "react";
import { Navbar, Button } from "flowbite-react";
import logo from "../../assets/images/254-no-bg.png";
import { FaHeart } from "react-icons/fa";

export default function NavigationBar() {
  return (
    <Navbar className="my-auto" fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="254 Realtors" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          254 Realtors
        </span>
      </Navbar.Brand>
      <div className="flex items-center gap-6 md:order-2">
        <span role="button">
          <FaHeart color="gray" size={26} />
        </span>
        <Button className="bg-[#468fd1]">Realtors</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/real-estate-agents">Real Estate Agents</Navbar.Link>
        <Navbar.Link href="/blog">Blog</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
