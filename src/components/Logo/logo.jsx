import "./index.css";
import logoSrc from "./logo.svg";

function Logo ({className, href, ...props})  {
	return (
		<a href={href ? href : "#"} className = { className ? className : "logo"} {...props}>
			<img src={logoSrc} alt="Логотип фирмы" className=""/>
		</a>
	);
};

export default Logo;
