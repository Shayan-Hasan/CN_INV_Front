import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import hello from "../data/nexusan-logo.png";
import { Col } from "react-bootstrap";
const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex item-center gap-4 pl-4 pt-2 pb-1 rounded-lg text-white text-md m-1";
  const normalLink =
    "flex item-center gap-4 pl-4 pt-2 pb-1 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              style={{ textDecoration: "none" }}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <Col
                // className="d-none d-lg-block"
                sm={true}
                style={{ padding: "0" }}
              >
                <img
                  src={hello}
                  style={{
                    // width: "80%",
                    // height: "80%",
                    // minWidth: "20%",
                    // minHeight: "20%",
                    objectFit: "contain",
                  }}
                />
              </Col>
              <Col
                className="d-block d-lg-none"
                sm={true}
                style={{ padding: "0" }}
              >
                <SiShopware />
                <span>Nexusan</span>
              </Col>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="m-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-2 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                      textDecoration: "none",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <label
                      // className="capitalize"
                      style={{
                        height: "19px",
                        lineHeight: "100%",
                      }}
                    >
                      {link.name}
                    </label>
                  </NavLink>
                ))}
              </div>
            ))}
            {/* <div className="form-group"> */}
            {/* <button
                className="btn btn-success login-btn"
                onClick={handleBackClick}
                type="submit"
              >
                LogOut
              </button> */}

            {/* <Link to="/" className="btn btn-danger">
                        Back
                      </Link> */}
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
