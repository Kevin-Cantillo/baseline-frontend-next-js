import { useRouter } from "next/router";
import Link from "next/link";
// import ShoppingCartIcon from '@components/Footer/ShoppingCartIcon';
// import AddToCart from '@components/ProductSummary/AddToCart';
import Icon from "@components/Commons/Icon";
import { currencyFormat } from "@helpers";
import { useCart } from "@store/Cart";

import styles from "./footer.module.scss";

const Footer = ({ product }) => {
  const { pathname } = useRouter();
  const { count: cartCount, subTotal } = useCart();

  const WhatsAppIcon = (
    <Link href="">
      <div className={styles.whatsappIcon}>
        <Icon name="whatsapp" size={32} />
      </div>
    </Link>
  );

  if (pathname === "/form") {
    return (
      <footer className={`${styles.footer} ${styles.form}`}>
        {WhatsAppIcon}
        <Link href="/form" passHref>
          <div className={`${styles.paymentFooter} ${styles.hidden}`}>
            <div>Finalizar el pedido</div>
          </div>
        </Link>
      </footer>
    );
  }
  if (pathname === "/cart") {
    return (
      <>
        {WhatsAppIcon}
        <footer className={`${styles.footer} ${styles.cart}`}>
          <div className={styles.resume}>
            <p className={styles.title}>Resumen de la compra</p>
            <div>
              <p>
                {cartCount} producto{cartCount > 1 && "s"}{" "}
              </p>
              <p className="secondary-color">
                {currencyFormat(subTotal, 0, "$")}
              </p>
            </div>
            <div>
              <p>Costo de envío</p>
              <p className="secondary-color"> Gratis</p>
            </div>
            <div className={styles.bold}>
              <p className="">Total de la compra</p>
              <p className="primary-color">
                {currencyFormat(subTotal, 0, "$")}
              </p>
            </div>
            <div>
              <p>Tiempo estimado de entrega </p>
              <p className="secondary-color"> 45 minutos</p>
            </div>
          </div>
          <Link href="/form" className={styles.items} passHref>
            <div className={styles.paymentFooter}>
              <div>Realizar el pedido</div>
            </div>
          </Link>
        </footer>
      </>
    );
  }

  if (cartCount > 0) {
    return (
      <footer className={`${styles.footer} ${styles.produtIntoCart}`}>
        {WhatsAppIcon}
        {product && (
          <div className={styles.addCart}>
            {<AddToCart product={product} />}
          </div>
        )}
        <Link href="/cart" className={styles.items} passHref>
          <div className={styles.contentFooter}>
            <ShoppingCartIcon cartCount={cartCount} name="Canasta" />
            <div>Ver el carrito de compras</div>
            <div>{currencyFormat(subTotal, 0, "$")}</div>
          </div>
        </Link>
      </footer>
    );
  }

  return (
    <footer className={`${styles.footer}`}>
      {WhatsAppIcon}
      {product && (
        <div className={styles.addCart}>{<AddToCart product={product} />}</div>
      )}
    </footer>
  );
};

export default Footer;
