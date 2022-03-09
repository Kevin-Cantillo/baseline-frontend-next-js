import styles from './spinner.module.scss';

const Spinner = ({ text }) => (
  <div className={styles.content}>
    <div className={styles.spinner}></div>
    <p>{text}</p>
  </div>
);

export default Spinner;
