import { useState } from "react";
import Link from "next/link";
// import FilterProduct from '@components/FilterProduct/FilterProduct';
import CardProduct from "@components/CardProduct/CardProduct";
// import Spinner from '@components/Commons/Spiner';
import Icon from "@components/Commons/Icon";
import { getSlugName } from "@helpers";

import styles from "./productList.module.scss";

const ProductList = ({ products = [], hiddenLoadProducts }) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className={styles.productListContainer}>
      <div className={styles.filterLabel}>
        <p>{products.length} resultados</p>
        <div onClick={() => setShowFilter(true)}>
          <p>Filtar</p>
          <Icon className={styles.icon} name="filter-list" />
        </div>
      </div>
      <div className={styles.contentList}>
        {products.map(
          (
            {
              nombreProducto,
              id,
              precioVenta,
              imagenes,
              codigoUniversalProductoUPC,
            },
            index
          ) => (
            <Link
              key={id + index}
              href={`/product/${getSlugName(nombreProducto, id)}`}
            >
              <div className={styles.product}>
                <CardProduct
                  name={nombreProducto}
                  image={imagenes}
                  price={precioVenta}
                  UPC={codigoUniversalProductoUPC}
                />
              </div>
            </Link>
          )
        )}
      </div>
      {!hiddenLoadProducts && <Spinner text="Cargando productos..." />}
      <FilterProduct open={showFilter} onClose={() => setShowFilter(false)} />
    </div>
  );
};

export default ProductList;
