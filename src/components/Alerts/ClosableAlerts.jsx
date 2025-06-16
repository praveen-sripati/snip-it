import { useState } from 'react';


export const ClosableAlerts = ({ styles , handleOnclick }) => {
  const [alertType, setAlertType] = useState('success');
  const [position, setPosition] = useState('top-center');
  const [duration, setDuration] = useState(3000);

  return (
    <>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.success}>
        <div class="alert success">
          <button class={styles['close-btn']} title="Close" aria-label="Close">&times;</button>
          <div class={styles['alert-content']}>
            <span class={styles['alert-header']}>Success Text</span>
            <span class={styles['alert-subtext']}>This is success description</span>
          </div>
        </div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.info}>
        <div class="alert info">
          <button class={styles['close-btn']} title="Close" aria-label="Close">&times;</button>
          <div class={styles['alert-content']}>
            <span class={styles['alert-header']}>Info Text</span>
            <span class={styles['alert-subtext']}>This is info description</span>
          </div>
        </div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.warning}>
        <div class="alert warning">
          <button class={styles['close-btn']} title="Close" aria-label="Close">&times;</button>
          <div class={styles['alert-content']}>
            <span class={styles['alert-header']}>Warning Text</span>
            <span class={styles['alert-subtext']}>This is warning description</span>
          </div>
        </div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.error}>
        <div class="alert error">
          <button class={styles['close-btn']} title="Close" aria-label="Close">&times;</button>
          <div class={styles['alert-content']}>
            <span class={styles['alert-header']}>Error Text</span>
            <span class={styles['alert-subtext']}>This is error description</span>
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <div className={styles.controlsContainer + ' ' + 'mr-6'}>
          <div className={styles.controlGroup}>
            <label htmlFor="position">Position</label>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={styles.select}
            >
              <option value="top-right">Top Right</option>
              <option value="top-center">Top Center</option>
              <option value="top-left">Top Left</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-left">Bottom Left</option>
            </select>
          </div>
          <div className={styles.controlGroup}>
            <label htmlFor="alertType">Alert Type</label>
            <select
              id="alertType"
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className={styles.select}
            >
              <option value="success">Success</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className={styles.controlGroup}>
            <label htmlFor="duration">Duration (ms)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className={styles.input}
              step="500"
            />
          </div>
        </div>
        <button
          class="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground cursor-pointer mr-4"
          onClick={() =>
            handleOnclick(
              `${alertType.slice(0, 1).toUpperCase() + alertType.slice(1)} Text`,
              `This is ${alertType} description`,
              alertType,
              duration,
              position,
              true,
              '600px'
            )
          }
        >
          Test Alert
        </button>
      </div>
    </>
  );
};
