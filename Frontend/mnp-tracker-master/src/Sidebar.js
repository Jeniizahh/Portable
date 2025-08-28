import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Custom styles for responsive tweaks

const Sidebar = () => (
  <Menu>
    <Link className="menu-item" to="/checking-status">
      Check Porting Status
    </Link>
    <Link className="menu-item" to="/request-porting">
      Request New Porting
    </Link>
    <Link className="menu-item" to="/upc">
      Get UPC Info
    </Link>
  </Menu>
);

export default Sidebar;
