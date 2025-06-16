import styles from './Alert.module.css';

export const Alert = () => {

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
      <div className="flex">
        <button
          class="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground cursor-pointer mr-4"
          onClick={() => handleOnclick('Success Text', 'success', 3000, 'top-center')}
        >
          Test Success
        </button>
        <button
          class="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground cursor-pointer mr-4"
          onClick={() => handleOnclick('Info Text', 'info', 3000, 'top-center')}
        >
          Test Info
        </button>
        <button
          class="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground cursor-pointer mr-4"
          onClick={() => handleOnclick('Warning Text', 'warning', 3000, 'top-center')}
        >
          Test Warning
        </button>
        <button
          class="rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground cursor-pointer mr-4"
          onClick={() => handleOnclick('Error Text', 'error', 3000, 'top-center')}
        >
          Test Error
        </button>
      </div>
    </>
  );
};
