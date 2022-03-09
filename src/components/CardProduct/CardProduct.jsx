import { useLayoutEffect, useState } from 'react';
import { currencyFormat, getImages } from '@helpers';

import styles from './cardProduct.module.scss';

const CardProduct = ({ name, price, UPC }) => {
  const [image, setImage] = useState('');

  useLayoutEffect(() => {
    setImage(getImages(UPC)[0]);
  }, []);

  return (
    <article
      className={styles.cardProduct}
      style={{
        backgroundImage: `url(${image})`
      }}
    >
      <div className={styles.description}>
        <div className={styles.header}>{name}</div>

        <div className={styles.meta}>{currencyFormat(price, 0, '$')}</div>
      </div>
    </article>
  );
};

export default CardProduct;
