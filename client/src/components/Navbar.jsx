import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      style={{ padding: "10px", backgroundColor: "#f8f9fa", marginBottom: "20px" }}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/home" style={{ marginRight: "20px" }}>Home</Link>
      <Link to="/admin">Admin Dashboard</Link>
    </motion.nav>
  );
};

export default Navbar;