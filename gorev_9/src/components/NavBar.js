import React from "react";
import NavDrawer from "./NavDrawer";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="bar">
      <h1 className="nav-header">Hava Durumu Sorgulama</h1>
      <NavDrawer></NavDrawer>
    </div>
  );
}
