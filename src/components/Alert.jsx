import { useState } from 'react';
import styles from './Alert.module.css';

export const Alert = () => {
  const [alertType, setAlertType] = useState('success');
  const [position, setPosition] = useState('top-center');
  const [duration, setDuration] = useState(3000);

  const handleOnclick = (message, type, duration, position) => {
    // Remove any alert that is already visible
    const existingAlert = document.querySelector('custom-alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create an instance of our new element
    const alertElement = document.createElement('custom-alert');

    // Set its attributes, which will be read by connectedCallback
    alertElement.setAttribute('message', message);
    alertElement.setAttribute('type', type);
    alertElement.setAttribute('duration', duration || 3000);
    alertElement.setAttribute('position', position);

    // Append it to the body to display it
    document.body.appendChild(alertElement);
  };

  return (
    <>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.success}>
        <div class="alert success">Success Text</div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.info}>
        <div class="alert info">Info Text</div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.warning}>
        <div class="alert warning">Warning Text</div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.error}>
        <div class="alert error">Error Text</div>
      </div>
      <div className="flex items-end">
        <div className={styles.controlsContainer + ' ' + 'mr-6'}>
          <div className={styles.controlGroup}>
            <label htmlFor="position">Position</label>
            <select id="position" value={position} onChange={(e) => setPosition(e.target.value)} className={styles.select}>
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
            <select id="alertType" value={alertType} onChange={(e) => setAlertType(e.target.value)} className={styles.select}>
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
          onClick={() => handleOnclick(`${alertType.slice(0, 1).toUpperCase() + alertType.slice(1)} Text`, alertType, duration, position)}
        >
          Test Alert
        </button>
      </div>
    </>
  );
};
