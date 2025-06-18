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
    'shifting-border': clsx(styles.btn, styles['btn-8']),
    'push-down': clsx(styles.btn, styles['btn-9']),
    'neon-flux': clsx(styles.btn, styles['btn-10']),
    'super-wave': clsx(styles.btn, styles['btn-11']),
    'star-light': clsx(styles.btn, styles['btn-12']),
    'plasma-flip': clsx(styles.btn, styles['btn-13']),
    'crystal-pop': clsx(styles.btn, styles['btn-14']),
    'frost-shake': clsx(styles.btn, styles['btn-15']),
    'text-quake': clsx(styles.btn, styles['btn-16']),
    'tear-apart': clsx(styles.btn, styles['btn-17']),
    'radar-sweep': clsx(styles.btn, styles['btn-18']),
    'old-keyboard-style-button': clsx(styles.btn, styles['btn-19']),
    'origami-fold': clsx(styles.btn, styles['btn-20']),
    'snake-style-retro': clsx(styles.btn, styles['btn-21']),
    'space-warp': clsx(styles.btn, styles['btn-22']),
    'liquid-fill': clsx(styles.btn, styles['btn-23']),
    'gummy-drop': clsx(styles.btn, styles['btn-24']),
    'exploding-particles': clsx(styles.btn, styles['btn-25']),
    'layer-slice': clsx(styles.btn, styles['btn-26']),
    'pixelated-art': clsx(styles.btn, styles['btn-27']),
  };

  const buttonClass = buttonTypes[snippet?.type];

  if (!buttonClass) return null;

  return (
    <div className="flex items-center justify-center min-h-[250px]">
      <button className={buttonClass}>
        {snippet.type === 'text-quake' ? (
          <span className={styles['shake-text']}>
            <span>S</span>
            <span>h</span>
            <span>a</span>
            <span>k</span>
            <span>e</span>
            <span>!</span>
          </span>
        ) : snippet.type === 'tear-apart' ? (
          <>
            <span className={styles.left}>But</span>
            <span className={styles.right}>ton</span>
          </>
        ) : snippet.type === 'radar-sweep' ? (
          <>
            <span>Scan</span>
            <span className={styles['radar-sweep']}></span>
            <span className={styles.blip}></span>
          </>
        ) : snippet.type === 'origami-fold' ? (
          <span className={styles['origami-text']}>Note Me</span>
        ) : snippet.type === 'snake-style-retro' ? (
          <>
            <span className={styles['snake-text']}>START</span>
            <div className={styles['snake-track']}>
              <div className={clsx(styles['snake-dot'], styles['snake-head'])}>👾</div>
              <div className={styles['snake-dot']}></div>
              <div className={styles['snake-dot']}></div>
              <div className={styles['snake-dot']}></div>
              <div className={styles['snake-dot']}></div>
            </div>
          </>
        ) : snippet.type === 'space-warp' ? (
          <>
            <span className={styles.text}>Warp Speed</span>
            <div className={styles['star-field']}>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
              <div className={styles.star}></div>
            </div>
            <div className={styles['speed-lines']}>
              <div className={styles['speed-line']}></div>
              <div className={styles['speed-line']}></div>
              <div className={styles['speed-line']}></div>
              <div className={styles['speed-line']}></div>
              <div className={styles['speed-line']}></div>
            </div>
          </>
        ) : snippet.type === 'liquid-fill' ? (
          <>
            <span>Fill Me</span>
            <div className={styles.liquid}>
              <div className={styles['wave-container']}>
                <div className={styles.wave}></div>
              </div>
              <div className={styles.bubbles}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </>
        ) : snippet.type === 'gummy-drop' ? (
          <>
            <span>GUMMY</span>
            <i className={clsx(styles.bubble, styles['bubble-1'])}></i>
            <i className={clsx(styles.bubble, styles['bubble-2'])}></i>
            <i className={clsx(styles.bubble, styles['bubble-3'])}></i>
          </>
        ) : snippet.type === 'layer-slice' ? (
          <>
            <span>
              <div className={styles.layer}>SUBMIT</div>
              <div className={styles.layer}>SUBMIT</div>
              <div className={styles.layer}>SUBMIT</div>
            </span>
          </>
        ) : snippet.type === 'pixelated-art' ? (
          <>
            <span className={styles['pixel-icon']}>🎮</span>
            <span className={styles['pixel-text']}>START</span>
          </>
        ) : (
          <span>Button</span>
        )}
      </button>
    </div>
  );
};
