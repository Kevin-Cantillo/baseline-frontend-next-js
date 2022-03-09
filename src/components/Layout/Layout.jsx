import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
// import HeadProvider from '@store/Head';

import styles from "./layout.module.scss";

const Layout = ({
  styleMain = {},
  children,
  onScrollBottom = () => {},
  product = null,
  onFilter = () => {},
  filters,
}) => {
  const handleOnScroll = (e) => {
    const elem = e.target;
    const scrollHeight = elem.scrollHeight - elem.offsetHeight;
    if (elem.scrollTop === scrollHeight) {
      onScrollBottom(elem.scrollTop);
    }
  };

  return (
    <HeadProvider>
      <Header onFilter={onFilter} filters={filters} />
      <main
        style={styleMain}
        onScroll={(e) => handleOnScroll(e)}
        className={styles.main}
      >
        {children}
      </main>
      <Footer product={product} />
    </HeadProvider>
  );
};

export default Layout;
