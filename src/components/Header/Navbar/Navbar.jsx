import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/Commons/Icon';

import styles from './navbar.module.scss';

const Navbar = () => {
  const { pathname, back } = useRouter();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    if (pathname === '/') {
      setIsHome(false);
    }
  });
  return (
    <nav className={styles.navbar}>
      <div className={styles.items}>
        {isHome && <Icon onClick={() => back()} name='arrow-back' clickeable />}
      </div>
      <div className={styles.items}>
        <Link href='/' passHref>
          <Image src='/images/logo-ihuman360.svg' width='160' height='50' />
        </Link>
      </div>
      <div className={styles.items}>
        {isHome && (
          <Link href='/' passHref>
            <Icon name='home' clickeable />
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
