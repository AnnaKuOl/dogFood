import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import logoSrc from "./logo.svg";

function Logo({ className, href, ...props }) {
  const hrefValue = href ? href : null;
  return hrefValue ? (
    <Link
      to={{ pathname: hrefValue }}
      className={className ? className : "logo"}
    >
      <img src={logoSrc} alt="Логотип фирмы" className="" />
    </Link>
  ) : (
    <a href="#" className={className ? className : "logo"} {...props}>
      <img src={logoSrc} alt="Логотип фирмы" className="" />
    </a>
  );
}

export default React.memo(Logo);
