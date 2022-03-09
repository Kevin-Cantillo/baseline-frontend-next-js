// import Image from 'next/image';
import svgs from './icons-libraries';

import styles from './icon.module.scss';

// const Icon = ({ name, size = 24, className = '', onClick = () => {}, clickeable = '' }) => (
//   <div
//     style={{ height: size, width: size }}
//     className={`${className} ${clickeable && styles.pointer}`}
//     onClick={e => onClick(e)}
//   >
//     <Image src={`/icons/${name}.svg`} width={`${size}px`} height={`${size}px`} />
//   </div>
// );

// export default Icon;

const Icon = ({ name, color = '', className, size = 24, onClick = () => {}, clickeable = '' }) => {
  const svgRender = svgs[name] || svgs.default;
  const currentClasses = className ? `${styles.svgIcon} ${className}` : styles.svgIcon;
  return (
    <svg
      viewBox={svgRender.viewBox}
      style={{ fontSize: `${size}px`, color }}
      width={size}
      height={size}
      className={`${currentClasses} ${clickeable && styles.pointer}`}
      title={name}
      xmlns='http://www.w3.org/2000/svg'
      onClick={e => onClick(e)}
    >
      {svgRender.svg}
    </svg>
  );
};

export default Icon;
