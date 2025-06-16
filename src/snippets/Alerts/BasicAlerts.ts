//Caution: Don't format this file, it is used in the playground and should be kept as is.
export const basicAlerts = {
  html: `<button id="show-basic-success">
  Test Success
</button>
<button id="show-basic-info">
  Test Info
</button>
<button id="show-basic-warning">
  Test Warning
</button>
<button id="show-basic-error">
  Test Error
</button>`,
  js: `class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
  }

  connectedCallback() {
    const position = this.getAttribute('position') || 'top-center';
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || 'No message provided.';
    const duration = parseInt(this.getAttribute('duration'), 10) || 3000;

    this.shadowRoot.innerHTML = \`
  <style>
    .alert {
      padding: 1rem 1.5rem;
      border-radius: 12px;
      border: 1px solid transparent;
      position: fixed;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease-out;
      opacity: 0;
    }

    /* All other CSS rules remain exactly the same */
    .alert.position-top-left,
    .alert.position-top-right { transform: translateY(-30px); }
    .alert.position-top-center { transform: translateX(-50%) translateY(-30px); }
    .alert.position-bottom-left,
    .alert.position-bottom-right { transform: translateY(30px); }
    .alert.position-bottom-center { transform: translateX(-50%) translateY(30px); }

    .alert.visible { opacity: 1; }
    .alert.visible.position-top-left,
    .alert.visible.position-top-right { transform: translateY(0); }
    .alert.visible.position-top-center { transform: translateX(-50%) translateY(0); }
    .alert.visible.position-bottom-left,
    .alert.visible.position-bottom-right { transform: translateY(0); }
    .alert.visible.position-bottom-center { transform: translateX(-50%) translateY(0); }

    .position-top-center { top: 20px; left: 50%; }
    .position-top-left { top: 20px; left: 20px; }
    .position-top-right { top: 20px; right: 20px; }
    .position-bottom-center { bottom: 20px; left: 50%; }
    .position-bottom-left { bottom: 20px; left: 20px; }
    .position-bottom-right { bottom: 20px; right: 20px; }
    
    .alert.success { background-color: #f0f9eb; border-color: #d4edda; color: #155724; }
    .alert.info    { background-color: #e7f3fe; border-color: #d1e7fd; color: #0c5460; }
    .alert.warning { background-color: #fffbe6; border-color: #faecd8; color: #856404; }
    .alert.error   { background-color: #fbe9e7; border-color: #f5c6cb; color: #7b1e19; }
  </style>
  
  <div class="alert \${type} \${'position-' + position}">
    \${message}
  </div>
\`;

    const alertDiv = this.shadowRoot.querySelector('.alert');
    setTimeout(() => {
      alertDiv.classList.add('visible');
    }, 10);

    setTimeout(() => {
      alertDiv.classList.remove('visible');
      alertDiv.addEventListener('transitionend', () => this.remove());
    }, duration);
  }
}

customElements.define('custom-alert', CustomAlert);

// A helper function to easily create and show our new component.
function showAlert(message, type = 'info', duration = 3000, position = 'top-center') {
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
  alertElement.setAttribute('duration', duration);
  alertElement.setAttribute('position', position);

  // Append it to the body to display it
  document.body.appendChild(alertElement);
}

// Event listener to trigger the alert
document.getElementById('show-basic-success').addEventListener('click', () => {
  showAlert('Success! The operation was completed.', 'success', 3000, 'top-center');
});
document.getElementById('show-basic-info').addEventListener('click', () => {
  showAlert('Info: This is an informational message.', 'info', 3000, 'top-center');
});
document.getElementById('show-basic-warning').addEventListener('click', () => {
  showAlert('Warning: Please be cautious!', 'warning', 3000, 'top-center');
});
document.getElementById('show-basic-error').addEventListener('click', () => {
  showAlert('Error: Something went wrong!', 'error', 3000, 'top-center');
});
`,
}