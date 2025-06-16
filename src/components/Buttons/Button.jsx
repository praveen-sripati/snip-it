import styles from './Button.module.css';
import clsx from 'clsx';

export const Button = ({ snippet }) => {
  const buttonTypes = {
    'wipe-left': clsx(styles.btn, styles['btn-1']),
    'fill-center': clsx(styles.btn, styles['btn-2']),
    'diagonal-wipe': clsx(styles.btn, styles['btn-3']),
    'circular-fill': clsx(styles.btn, styles['btn-4']),
    'double-wipe': clsx(styles.btn, styles['btn-5']),
    'border-sweep': clsx(styles.btn, styles['btn-6']),
  };

  const buttonClass = buttonTypes[snippet?.type];

  if (!buttonClass) return null;

  return (
    <button className={buttonClass}>
      <span>Button</span>
    </button>
  );
};
