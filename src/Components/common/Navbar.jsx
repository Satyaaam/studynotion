import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";
import { IoIosArrowDown } from "react-icons/io";

const subLinks = [
  {
    title: "python",
    link: "/catlog/python",
  },
  {
    title: "c++",
    link: "/catlog/c++",
  },
  {
    title: "DSA",
    link: "/catlog/DSA",
  },
  {
    title: "AI/ML",
    link: "/catlog/AI/ML",
  },
];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  // const [subLinks, setSubLinks] = useState([]);
  // const fetchSublink = async () => {
  //   try {
  //     var result = await apiConnector("GET", categories.CATEGORIES_API);
  //     // result = result.json();
  //     console.log("Printing sublinks result", result);
  //     setSubLinks(result.data.data);
  //     console.log("sublinks", subLinks);
  //   } catch (err) {
  //     console.log(err);
  //     console.log("cannot fetch the category list.");
  //   }
  // };
  useEffect(() => {
    // fetchSublink();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center justify-between border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 flex max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="main logi image"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((element, index) => {
              return (
                <li key={index}>
                  {element.title === "Catalog" ? (
                    <div className="cursor-pointer relative flex gap-1 items-center group">
                      <p>{element.title}</p>
                      <IoIosArrowDown className=" group-hover:rotate-180 duration-300" />
                      <div className="invisible absolute left-[-90%] top-[100%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                        {subLinks.map((item, index) => {
                          return (
                            <div key={index}>
                              <Link to={item.link}>{item.title}</Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      className={`${
                        matchRoute(element?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                      to={element?.path}
                    >
                      {element.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="flex gap-4 items-center">
          {user && user.accounttype !== "Instructor" && (
            <Link
              to={"/dashboard/cart"}
              className="relative text-richblack-100"
            >
              <AiOutlineShoppingCart className="text-richblack-100" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-700 text-richblack-100 font-bold px-[12px] rounded py-[8px]">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-700 text-richblack-100 font-bold px-[12px] rounded py-[8px]">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
