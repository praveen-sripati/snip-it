import { useState } from 'react';

export const IconAlerts = ({ styles, handleOnclick }) => {
  const [alertType, setAlertType] = useState('success');
  const [position, setPosition] = useState('top-center');
  const [duration, setDuration] = useState(3000);

  return (
    <>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.success}>
        <div class="alert success">
          <div className="flex items-center">
            <div className="mr-2">
              <svg width="24" height="24" fill="none" stroke="#28a745" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="#28a745" fill="#f0f9eb" />
                <path d="M8 12l2 2l4-4" stroke="#28a745" stroke-width="2" fill="none" />
              </svg>
            </div>
            <span>Success Text</span>
          </div>
        </div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.info}>
        <div class="alert info">
          <div className="flex items-center">
            <div className="mr-2">
              <svg width="24" height="24" fill="none" stroke="#17a2b8" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="#17a2b8" fill="#e7f3fe" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>
            <span>Info Text</span>
          </div>
        </div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.warning}>
        <div class="alert warning">
          <div className="flex items-center">
            <div className="mr-2">
              <svg width="24" height="24" fill="none" stroke="#ffc107" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="#ffc107" fill="#fffbe6" />
                <line x1="12" y1="8" x2="12" y2="13" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>
            <span>Warning Text</span>
          </div>
        </div>
      </div>
      <div className={'border rounded-md p-4' + ' ' + styles.alert + ' ' + styles.error}>
        <div class="alert error">
          <div className="flex items-center">
            <div className="mr-2">
              <svg width="24" height="24" fill="none" stroke="#dc3545" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke="#dc3545" fill="#fbe9e7" />
                <line x1="9" y1="9" x2="15" y2="15" />
                <line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            </div>
            <span>Error Text</span>
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
      </div>
      <button
        class="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground cursor-pointer self-center mt-6"
        onClick={() =>
          handleOnclick(
            '',
            `${alertType.slice(0, 1).toUpperCase() + alertType.slice(1)} Text`,
            alertType,
            duration,
            position,
            false,
            null,
            null,
            true
          )
        }
      >
        Test Alert
      </button>
    </>
  );
};
