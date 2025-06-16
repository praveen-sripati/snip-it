import styles from './Alert.module.css';
import { BasicAlerts } from './BasicAlerts';
import { ClosableAlerts } from './ClosableAlerts';
import { ClosableIconAlerts } from './ClosableIconAlerts';
import { IconAlerts } from './IconAlerts';

export const Alert = ({ snippet }) => {
  const handleOnclick = (
    message = 'Message Header',
    subtext = 'Message subtext',
    type = 'success',
    duration = 3000,
    position = 'top-center',
    showClose = false,
    width,
    icon = '',
    showIcon = false
  ) => {
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
    alertElement.setAttribute('subtext', subtext || '');
    if (showClose) alertElement.setAttribute('show-close', showClose);
    alertElement.setAttribute('custom-width', width || '');
    alertElement.setAttribute('icon', icon || '');
    alertElement.setAttribute('show-icon', showIcon);

    // Append it to the body to display it
    document.body.appendChild(alertElement);
  };

  return (
    <>
      {snippet.alertCategory === 'basic' && <BasicAlerts styles={styles} handleOnclick={handleOnclick} />}
      {snippet.alertCategory === 'closable' && <ClosableAlerts styles={styles} handleOnclick={handleOnclick} />}
      {snippet.alertCategory === 'icon' && <IconAlerts styles={styles} handleOnclick={handleOnclick} />}
      {snippet.alertCategory === 'icon-closable' && <ClosableIconAlerts styles={styles} handleOnclick={handleOnclick}></ClosableIconAlerts>}
    </>
  );
};
