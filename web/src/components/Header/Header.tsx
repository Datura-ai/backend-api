import styles from "./headerStyles.module.css";
import logoSrc from "../../assets/taotensor_logo.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logoSrc} alt="n/a" />
    </div>
  );
};

export default Header;
