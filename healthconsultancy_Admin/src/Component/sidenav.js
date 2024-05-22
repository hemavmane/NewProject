import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const navData = [
  {
    id: 0,
    text: "Contact Details",
    link: "/dashboard",
  },

  {
    id: 15,
    text: "Logout",
    link: "/",
  },
];

const Sidenav1 = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };




  return (
    <div className={open ? "sidenav" : "sidenavClosed"}>


      <div className="row ul_list">
        <li
          style={{
            width: "95%",
            borderBottom: "1px solid grey",
            display: open ? " flex" : "none",
          }}
        >
          <NavLink
            to="/"
            className="link_tag img"
            style={{ textDecoration: "none" }}
          >
            <img
              className="m-auto"
              style={{ borderRadius: "100px" }}
              width="60px"
              height="60px"
              src="http://localhost:5173/src/Components/Images/HealthConsultancyLogo.webp"
              alt=""
            />
            <h6
              style={{
                display: open ? " flex" : " none",
              }}
            >
             Health Consultancy
            </h6>
          </NavLink>
        </li>

        {navData.map((item) => {
          return (
            <li key={item.id}>
              <NavLink
                className={
                  isActive(item.link) ? "sideitem active" : "sideitem "
                }
                activeClassName="active"
                to={item.link}
              >
                {item.icon}
                <span className={open ? "linkText " : "linkTextClosed active"}>
                  {item.text}
                </span>
              </NavLink>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Sidenav1;
