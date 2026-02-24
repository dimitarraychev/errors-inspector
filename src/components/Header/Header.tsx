import "./Header.css";
import logoSvg from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <img src={logoSvg} alt="Logo" className="logo" />
        <h1 className="logo-text">Errors Inspector</h1>
      </div>
    </header>
  );
};

export default Header;
