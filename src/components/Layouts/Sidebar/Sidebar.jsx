import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import Menu from "./components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import unetLogo from './../../../assets/img/UNET.png'
import MenuDrawer from "./components/Menu/MenuDrawer";
import { useState } from "react";
function Sidebar() {
  const [open, setOpen] = useState(false);


  return (
    <div>
     
      <MenuDrawer open={open} setOpen={setOpen}  />
    </div>
  );
}

export default Sidebar;
