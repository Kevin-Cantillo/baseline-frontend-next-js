import styles from './loadingProduct.module.scss';

const LoadingProduct = ({ repeat = 0 }) => {
  const repeatArr = [...new Array(repeat).keys()];
  return (
    <div className={styles.contentList}>
      {repeatArr.map(i => (
        <div key={`card${i}`} className={styles.card}>
          <div className={styles.image}></div>
          <div className={styles.header}></div>
          <div className={styles.meta}></div>
        </div>
      ))}
    </div>
  );
  // return <ProductList products={repeatArr} />;
};

export default LoadingProduct;
