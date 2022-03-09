import { useEffect, useState } from 'react';
import Layout from '@components/Layout/Layout';
import ProductList from '@components/ProductList/ProductList';
import LoadingProductList from '@components/Commons/LoadingProduct';

import productsService from '@services/productsService.js';
/* Use for pre rendering products */
/* export const getServerSideProps = async () => {
  const products = await productsService.getAllProducts();
  let productsList = [];
  if (products.success) {
    productsList = products.data;
  }

  return {
    props: {
      productsList,
    },
  };
}; */

const Home = (/* { productsList } */) => {
  const [productsList, setProductsList] = useState([]);
  const [lastProduct, setLastProduct] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState([]);
  const [hiddenLoadProducts, setHiddenLoadProducts] = useState(false);

  const getProducts = async ({ lastVisible, limit = 20, selectedfilters = [] }) => {
    const products = await productsService.getAllProducts(lastVisible, limit, selectedfilters);
    if (products.success) {
      setProductsList([...productsList, ...products.data]);
      setLastProduct(products.lastVisible);
      setTotalProducts(products.size);
      if (products.size <= productsList.length + products.data.length) {
        setHiddenLoadProducts(true);
      }
    }
  };

  const handleLoadMoreProducts = () => {
    if (productsList.length < totalProducts) {
      getProducts({ lastVisible: lastProduct });
    }
  };

  const onFilter = (filter = [], action = '') => {
    if (action === 'reset') {
      localStorage.setItem('filters', JSON.stringify([]));
      setProductsList([]);
      setFilters([]);
      return;
    }
    const filtersStorage = localStorage.getItem('filters');
    const filtersParsed = JSON.parse(filtersStorage) || [];
    const newfilters = [...filtersParsed.filter(f => f[0] !== filter[0])];
    if (filter.length) {
      newfilters.push(filter);
    }
    if (!newfilters.length) return;
    setProductsList([]);
    setFilters(newfilters);
    localStorage.setItem('filters', JSON.stringify(newfilters));
  };

  useEffect(async () => {
    getProducts({ selectedfilters: filters });
  }, [filters]);

  useEffect(() => {
    onFilter();
  }, []);

  return (
    <Layout onScrollBottom={e => handleLoadMoreProducts(e)} onFilter={onFilter} filters={filters}>
      <div className='container' style={{ paddingTop: '96px' }}>
        {productsList.length ? (
          <ProductList hiddenLoadProducts={hiddenLoadProducts} products={productsList} />
        ) : (
          <LoadingProductList repeat={8} />
        )}
      </div>
    </Layout>
  );
};

export default Home;
