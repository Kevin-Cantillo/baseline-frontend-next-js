import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@components/Navbar/Navbar";
import Input from "@components/Commons/Input";
// import SlideCards from '@components/SlideCards/SlideCards';
// import companiesService from '@services/companiesService';
// import categoriesService from '@services/categoriesService';
// import { useHead } from '@store/Head';

import styles from "./header.module.scss";

const Header = ({ onFilter = () => {}, filters }) => {
  const headContext = useHead();
  const { pathname } = useRouter();
  const [dataSlide, setDataSlide] = useState([]);
  const [isHome, setIsHome] = useState(false);

  const getCompanies = async () => {
    const resultCompanies = await companiesService.getAllCompanies();
    if (resultCompanies.success) {
      setDataSlide(
        resultCompanies.data.map((company) => ({
          ...company,
          name: company.nombreEmpresa,
        }))
      );
    }
  };

  const getCategories = async () => {
    const resultCategories = await categoriesService.getAllCategories();
    if (resultCategories.success) {
      setDataSlide(
        resultCategories.data.map((category) => ({
          ...category,
          name: category.nombreCategoria,
        }))
      );
    }
  };

  useEffect(() => {
    if (pathname !== "/") {
      getCategories();
      setIsHome(false);
    } else {
      getCompanies();
      setIsHome(true);
    }
  }, []);

  return (
    <header
      className={`${styles.head} ${
        headContext.showSearch && styles.contentSearch
      }`}
    >
      <Navbar />
      {headContext.showSearch && (
        <div className={styles.search}>
          <Input
            name="Search"
            placeholder="Buscar"
            value=""
            onChange={() => {}}
            style={{
              backgroundColor: "#076799",
              border: "none",
              color: "white",
            }}
            icon="search"
          />
        </div>
      )}
      {headContext.showCategories && (
        <SlideCards
          showTagsNames={!isHome}
          onFilter={onFilter}
          filters={filters}
          cards={dataSlide}
        />
      )}
    </header>
  );
};

export default Header;
