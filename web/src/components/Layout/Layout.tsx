import styles from "./layoutStyles.module.css";

import Header from "../Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Layout;
