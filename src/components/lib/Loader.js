import React from "react";
import { FaSpinner } from "react-icons/fa";
import "./Loader.css";

export function Loader({ size, className }) {
  return <FaSpinner className={`spinner-loader ${className}`} size={size} />;
}
