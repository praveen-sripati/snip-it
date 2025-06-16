//Caution: Don't format this file, it is used in the playground and should be kept as is.
export const basicAlerts = {
  id: 1,
  category: 'alert',
  title: 'Basic Alerts',
  alertCategory: 'basic',
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
    this._closeHandler = this._closeHandler.bind(this);
  }

  connectedCallback() {
    const position = this.getAttribute('position') || 'top-center';
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';
    const subtext = this.getAttribute('subtext') || '';
    const duration = parseInt(this.getAttribute('duration'), 10) || 3000;
    const showClose = this.hasAttribute('show-close');
    const customWidth = this.getAttribute('custom-width') || '';
    const icon = this.getAttribute('icon') || '';
    const showIcon = this.hasAttribute('show-icon') && this.getAttribute('show-icon') !== 'false';

    // Default icons for types if icon attribute is not set
    const typeIcons = {
      success: \`<svg width="24" height="24" fill="none" stroke="#28a745" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#28a745" fill="#f0f9eb"/><path d="M8 12l2 2l4-4" stroke="#28a745" stroke-width="2" fill="none"/></svg>\`,
      info: \`<svg width="24" height="24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#17a2b8" fill="#e7f3fe"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>\`,
      warning: \`<svg width="24" height="24" fill="none" stroke="#ffc107" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#ffc107" fill="#fffbe6"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="1"/></svg>\`,
      error: \`<svg width="24" height="24" fill="none" stroke="#dc3545" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#dc3545" fill="#fbe9e7"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>\`
    };

    // Use custom icon if provided, else use default for type
    let iconMarkup = '';
    if (showIcon) {
      iconMarkup = icon ?
        \`<span class="alert-icon">\${icon}</span>\` :
        \`<span class="alert-icon">\${typeIcons[type] || ''}</span>\`;
    } else {
      iconMarkup = '';
    }

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
      min-width: 260px;
      max-width: 600px;
    }
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

    .alert-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .alert-header {
      font-weight: 600;
      font-size: 1rem;
    }
    .alert-subtext {
      font-size: 0.92rem;
      color: #555;
    }
    .close-btn {
      position: absolute;
      top: 8px;
      right: 12px;
      background: transparent;
      border: none;
      font-size: 1.2rem;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .close-btn:hover {
      opacity: 1;
    }
    .alert-main-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .alert-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }
    </style>
    <div class="alert \${type} \${'position-' + position}" style="\${customWidth ? \`width: \${customWidth};\` : ''}">
      \${showClose ? \`<button class="close-btn" title="Close" aria-label="Close">&times;</button>\` : ''}
      <div class="alert-main-row" style="\${showIcon && (!message || !subtext) ? \`align-items: center;\` : ''}">
        \${iconMarkup}
        <div class="alert-content">
        \${message ? \`<span class="alert-header">\${message}</span>\`: ''}
        \${subtext ? \`<span class="alert-subtext">\${subtext}</span>\` : ''}
        </div>
      </div>
    </div>
  \`;

    const alertDiv = this.shadowRoot.querySelector('.alert');
    setTimeout(() => {
      alertDiv.classList.add('visible');
    }, 10);

    // Handle close button
    if (showClose) {
      const closeBtn = this.shadowRoot.querySelector('.close-btn');
      closeBtn.addEventListener('click', this._closeHandler);
    }

    // Auto close after duration, regardless of showClose
    if (duration > 0) {
      this._timeout = setTimeout(() => {
        alertDiv.classList.remove('visible');
        alertDiv.addEventListener('transitionend', () => this.remove());
      }, duration);
    }
  }

  disconnectedCallback() {
    if (this._timeout) clearTimeout(this._timeout);
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    if (closeBtn) closeBtn.removeEventListener('click', this._closeHandler);
  }

  _closeHandler() {
    if (this._timeout) clearTimeout(this._timeout);
    const alertDiv = this.shadowRoot.querySelector('.alert');
    alertDiv.classList.remove('visible');
    alertDiv.addEventListener('transitionend', () => this.remove());
  }
}

customElements.define('custom-alert', CustomAlert);

// A helper function to easily create and show our new component.
function showAlert(
  message = 'Message Header',
  subtext = 'Message subtext',
  type = 'success',
  duration = 3000,
  position = 'top-center',
  showClose = false,
  width,
  icon = '',
  showIcon = false
) {
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
// Event listener to trigger the alert
document.getElementById('show-basic-success').addEventListener('click', () => {
  showAlert('',
    'Success Text',
    'success',
    3000,
    'top-center',
    false,
    null,
    null,
    false
  );
});
document.getElementById('show-basic-info').addEventListener('click', () => {
  showAlert('',
    'Info Text',
    'info',
    3000,
    'top-center',
    false,
    null,
    null,
    false
  );
});
document.getElementById('show-basic-warning').addEventListener('click', () => {
  showAlert('',
    'Warning Text',
    'warning',
    3000,
    'top-center',
    false,
    null,
    null,
    false
  );
});
document.getElementById('show-basic-error').addEventListener('click', () => {
  showAlert('',
    'Error Text',
    'error',
    3000,
    'top-center',
    false,
    null,
    null,
    false
  );
});
`,
  codePen: "https://codepen.io/praveen-sripati/pen/RNPBjZw"
}

export const closableAlerts = {
  id: 2,
  category: 'alert',
  title: 'Closable Alerts',
  alertCategory: 'closable',
  html: `<button id="show-closable-success">
  Test Success
</button>
<button id="show-closable-info">
  Test Info
</button>
<button id="show-closable-warning">
  Test Warning
</button>
<button id="show-closable-error">
  Test Error
</button>`,
  js: `class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this._closeHandler = this._closeHandler.bind(this);
  }

  connectedCallback() {
    const position = this.getAttribute('position') || 'top-center';
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';
    const subtext = this.getAttribute('subtext') || '';
    const duration = parseInt(this.getAttribute('duration'), 10) || 3000;
    const showClose = this.hasAttribute('show-close');
    const customWidth = this.getAttribute('custom-width') || '';
    const icon = this.getAttribute('icon') || '';
    const showIcon = this.hasAttribute('show-icon') && this.getAttribute('show-icon') !== 'false';

    // Default icons for types if icon attribute is not set
    const typeIcons = {
      success: \`<svg width="24" height="24" fill="none" stroke="#28a745" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#28a745" fill="#f0f9eb"/><path d="M8 12l2 2l4-4" stroke="#28a745" stroke-width="2" fill="none"/></svg>\`,
      info: \`<svg width="24" height="24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#17a2b8" fill="#e7f3fe"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>\`,
      warning: \`<svg width="24" height="24" fill="none" stroke="#ffc107" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#ffc107" fill="#fffbe6"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="1"/></svg>\`,
      error: \`<svg width="24" height="24" fill="none" stroke="#dc3545" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#dc3545" fill="#fbe9e7"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>\`
    };

    // Use custom icon if provided, else use default for type
    let iconMarkup = '';
    if (showIcon) {
      iconMarkup = icon ?
        \`<span class="alert-icon">\${icon}</span>\` :
        \`<span class="alert-icon">\${typeIcons[type] || ''}</span>\`;
    } else {
      iconMarkup = '';
    }

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
      min-width: 260px;
      max-width: 600px;
    }
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

    .alert-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .alert-header {
      font-weight: 600;
      font-size: 1rem;
    }
    .alert-subtext {
      font-size: 0.92rem;
      color: #555;
    }
    .close-btn {
      position: absolute;
      top: 8px;
      right: 12px;
      background: transparent;
      border: none;
      font-size: 1.2rem;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .close-btn:hover {
      opacity: 1;
    }
    .alert-main-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .alert-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }
    </style>
    <div class="alert \${type} \${'position-' + position}" style="\${customWidth ? \`width: \${customWidth};\` : ''}">
      \${showClose ? \`<button class="close-btn" title="Close" aria-label="Close">&times;</button>\` : ''}
      <div class="alert-main-row" style="\${showIcon && (!message || !subtext) ? \`align-items: center;\` : ''}">
        \${iconMarkup}
        <div class="alert-content">
        \${message ? \`<span class="alert-header">\${message}</span>\`: ''}
        \${subtext ? \`<span class="alert-subtext">\${subtext}</span>\` : ''}
        </div>
      </div>
    </div>
  \`;

    const alertDiv = this.shadowRoot.querySelector('.alert');
    setTimeout(() => {
      alertDiv.classList.add('visible');
    }, 10);

    // Handle close button
    if (showClose) {
      const closeBtn = this.shadowRoot.querySelector('.close-btn');
      closeBtn.addEventListener('click', this._closeHandler);
    }

    // Auto close after duration, regardless of showClose
    if (duration > 0) {
      this._timeout = setTimeout(() => {
        alertDiv.classList.remove('visible');
        alertDiv.addEventListener('transitionend', () => this.remove());
      }, duration);
    }
  }

  disconnectedCallback() {
    if (this._timeout) clearTimeout(this._timeout);
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    if (closeBtn) closeBtn.removeEventListener('click', this._closeHandler);
  }

  _closeHandler() {
    if (this._timeout) clearTimeout(this._timeout);
    const alertDiv = this.shadowRoot.querySelector('.alert');
    alertDiv.classList.remove('visible');
    alertDiv.addEventListener('transitionend', () => this.remove());
  }
}

customElements.define('custom-alert', CustomAlert);

// A helper function to easily create and show our new component.
function showAlert(
  message = 'Message Header',
  subtext = 'Message subtext',
  type = 'success',
  duration = 3000,
  position = 'top-center',
  showClose = false,
  width,
  icon = '',
  showIcon = false
) {
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
// Event listener to trigger the alert
document.getElementById('show-closable-success').addEventListener('click', () => {
  showAlert(
    'Success Text',
    'This is success description',
    'success',
    3000,
    'top-center',
    true,
    '600px'
  );
});
document.getElementById('show-closable-info').addEventListener('click', () => {
  showAlert(
    'Info Text',
    'This is info description',
    'info',
    3000,
    'top-center',
    true,
    '600px'
  );
});
document.getElementById('show-closable-warning').addEventListener('click', () => {
  showAlert(
    'Warning Text',
    'This is warning description',
    'warning',
    3000,
    'top-center',
    true,
    '600px'
  );
});
document.getElementById('show-closable-error').addEventListener('click', () => {
  showAlert(
    'Error Text',
    'This is error description',
    'error',
    3000,
    'top-center',
    true,
    '600px'
  );
});
`,
codePen: 'https://codepen.io/praveen-sripati/pen/zxGLpog'
}

export const iconAlerts = {
  id: 3,
  category: 'alert',
  title: 'Icon Alerts',
  alertCategory: 'icon',
  html: `<button id="show-icon-alert-success">
  Test Success
</button>
<button id="show-icon-alert-info">
  Test Info
</button>
<button id="show-icon-alert-warning">
  Test Warning
</button>
<button id="show-icon-alert-error">
  Test Error
</button>`,
  js: `class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this._closeHandler = this._closeHandler.bind(this);
  }

  connectedCallback() {
    const position = this.getAttribute('position') || 'top-center';
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';
    const subtext = this.getAttribute('subtext') || '';
    const duration = parseInt(this.getAttribute('duration'), 10) || 3000;
    const showClose = this.hasAttribute('show-close');
    const customWidth = this.getAttribute('custom-width') || '';
    const icon = this.getAttribute('icon') || '';
    const showIcon = this.hasAttribute('show-icon') && this.getAttribute('show-icon') !== 'false';

    // Default icons for types if icon attribute is not set
    const typeIcons = {
      success: \`<svg width="24" height="24" fill="none" stroke="#28a745" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#28a745" fill="#f0f9eb"/><path d="M8 12l2 2l4-4" stroke="#28a745" stroke-width="2" fill="none"/></svg>\`,
      info: \`<svg width="24" height="24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#17a2b8" fill="#e7f3fe"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>\`,
      warning: \`<svg width="24" height="24" fill="none" stroke="#ffc107" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#ffc107" fill="#fffbe6"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="1"/></svg>\`,
      error: \`<svg width="24" height="24" fill="none" stroke="#dc3545" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#dc3545" fill="#fbe9e7"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>\`
    };

    // Use custom icon if provided, else use default for type
    let iconMarkup = '';
    if (showIcon) {
      iconMarkup = icon ?
        \`<span class="alert-icon">\${icon}</span>\` :
        \`<span class="alert-icon">\${typeIcons[type] || ''}</span>\`;
    } else {
      iconMarkup = '';
    }

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
      min-width: 260px;
      max-width: 600px;
    }
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

    .alert-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .alert-header {
      font-weight: 600;
      font-size: 1rem;
    }
    .alert-subtext {
      font-size: 0.92rem;
      color: #555;
    }
    .close-btn {
      position: absolute;
      top: 8px;
      right: 12px;
      background: transparent;
      border: none;
      font-size: 1.2rem;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .close-btn:hover {
      opacity: 1;
    }
    .alert-main-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .alert-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }
    </style>
    <div class="alert \${type} \${'position-' + position}" style="\${customWidth ? \`width: \${customWidth};\` : ''}">
      \${showClose ? \`<button class="close-btn" title="Close" aria-label="Close">&times;</button>\` : ''}
      <div class="alert-main-row" style="\${showIcon && (!message || !subtext) ? \`align-items: center;\` : ''}">
        \${iconMarkup}
        <div class="alert-content">
        \${message ? \`<span class="alert-header">\${message}</span>\`: ''}
        \${subtext ? \`<span class="alert-subtext">\${subtext}</span>\` : ''}
        </div>
      </div>
    </div>
  \`;

    const alertDiv = this.shadowRoot.querySelector('.alert');
    setTimeout(() => {
      alertDiv.classList.add('visible');
    }, 10);

    // Handle close button
    if (showClose) {
      const closeBtn = this.shadowRoot.querySelector('.close-btn');
      closeBtn.addEventListener('click', this._closeHandler);
    }

    // Auto close after duration, regardless of showClose
    if (duration > 0) {
      this._timeout = setTimeout(() => {
        alertDiv.classList.remove('visible');
        alertDiv.addEventListener('transitionend', () => this.remove());
      }, duration);
    }
  }

  disconnectedCallback() {
    if (this._timeout) clearTimeout(this._timeout);
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    if (closeBtn) closeBtn.removeEventListener('click', this._closeHandler);
  }

  _closeHandler() {
    if (this._timeout) clearTimeout(this._timeout);
    const alertDiv = this.shadowRoot.querySelector('.alert');
    alertDiv.classList.remove('visible');
    alertDiv.addEventListener('transitionend', () => this.remove());
  }
}

customElements.define('custom-alert', CustomAlert);

// A helper function to easily create and show our new component.
function showAlert(
  message = 'Message Header',
  subtext = 'Message subtext',
  type = 'success',
  duration = 3000,
  position = 'top-center',
  showClose = false,
  width,
  icon = '',
  showIcon = false
) {
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
// Event listener to trigger the alert
document.getElementById('show-icon-alert-success').addEventListener('click', () => {
  showAlert(
    '',
    'This is success description',
    'success',
    3000,
    'top-center',
    false,
    null,
    null,
    true
  );
});
document.getElementById('show-icon-alert-info').addEventListener('click', () => {
  showAlert(
    '',
    'This is info description',
    'info',
    3000,
    'top-center',
    false,
    null,
    null,
    true
  );
});
document.getElementById('show-icon-alert-warning').addEventListener('click', () => {
  showAlert(
    '',
    'This is warning description',
    'warning',
    3000,
    'top-center',
    false,
    null,
    null,
    true
  );
});
document.getElementById('show-icon-alert-error').addEventListener('click', () => {
  showAlert(
    '',
    'This is error description',
    'error',
    3000,
    'top-center',
    false,
    null,
    null,
    true
  );
});
`,
codePen: "https://codepen.io/praveen-sripati/pen/yyNqpMG"
}

export const closableIconAlerts = {
  id: 4,
  category: 'alert',
  title: 'Closable Icon Alerts',
  alertCategory: 'icon-closable',
  html: `<button id="show-icon-closable-alert-success">
  Test Success
</button>
<button id="show-icon-closable-alert-info">
  Test Info
</button>
<button id="show-icon-closable-alert-warning">
  Test Warning
</button>
<button id="show-icon-closable-alert-error">
  Test Error
</button>`,
  js: `class CustomAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this._closeHandler = this._closeHandler.bind(this);
  }

  connectedCallback() {
    const position = this.getAttribute('position') || 'top-center';
    const type = this.getAttribute('type') || 'info';
    const message = this.getAttribute('message') || '';
    const subtext = this.getAttribute('subtext') || '';
    const duration = parseInt(this.getAttribute('duration'), 10) || 3000;
    const showClose = this.hasAttribute('show-close');
    const customWidth = this.getAttribute('custom-width') || '';
    const icon = this.getAttribute('icon') || '';
    const showIcon = this.hasAttribute('show-icon') && this.getAttribute('show-icon') !== 'false';

    // Default icons for types if icon attribute is not set
    const typeIcons = {
      success: \`<svg width="24" height="24" fill="none" stroke="#28a745" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#28a745" fill="#f0f9eb"/><path d="M8 12l2 2l4-4" stroke="#28a745" stroke-width="2" fill="none"/></svg>\`,
      info: \`<svg width="24" height="24" fill="none" stroke="#17a2b8" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#17a2b8" fill="#e7f3fe"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>\`,
      warning: \`<svg width="24" height="24" fill="none" stroke="#ffc107" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#ffc107" fill="#fffbe6"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="1"/></svg>\`,
      error: \`<svg width="24" height="24" fill="none" stroke="#dc3545" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="#dc3545" fill="#fbe9e7"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>\`
    };

    // Use custom icon if provided, else use default for type
    let iconMarkup = '';
    if (showIcon) {
      iconMarkup = icon ?
        \`<span class="alert-icon">\${icon}</span>\` :
        \`<span class="alert-icon">\${typeIcons[type] || ''}</span>\`;
    } else {
      iconMarkup = '';
    }

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
      min-width: 260px;
      max-width: 600px;
    }
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

    .alert-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .alert-header {
      font-weight: 600;
      font-size: 1rem;
    }
    .alert-subtext {
      font-size: 0.92rem;
      color: #555;
    }
    .close-btn {
      position: absolute;
      top: 8px;
      right: 12px;
      background: transparent;
      border: none;
      font-size: 1.2rem;
      color: inherit;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .close-btn:hover {
      opacity: 1;
    }
    .alert-main-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .alert-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }
    </style>
    <div class="alert \${type} \${'position-' + position}" style="\${customWidth ? \`width: \${customWidth};\` : ''}">
      \${showClose ? \`<button class="close-btn" title="Close" aria-label="Close">&times;</button>\` : ''}
      <div class="alert-main-row" style="\${showIcon && (!message || !subtext) ? \`align-items: center;\` : ''}">
        \${iconMarkup}
        <div class="alert-content">
        \${message ? \`<span class="alert-header">\${message}</span>\`: ''}
        \${subtext ? \`<span class="alert-subtext">\${subtext}</span>\` : ''}
        </div>
      </div>
    </div>
  \`;

    const alertDiv = this.shadowRoot.querySelector('.alert');
    setTimeout(() => {
      alertDiv.classList.add('visible');
    }, 10);

    // Handle close button
    if (showClose) {
      const closeBtn = this.shadowRoot.querySelector('.close-btn');
      closeBtn.addEventListener('click', this._closeHandler);
    }

    // Auto close after duration, regardless of showClose
    if (duration > 0) {
      this._timeout = setTimeout(() => {
        alertDiv.classList.remove('visible');
        alertDiv.addEventListener('transitionend', () => this.remove());
      }, duration);
    }
  }

  disconnectedCallback() {
    if (this._timeout) clearTimeout(this._timeout);
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    if (closeBtn) closeBtn.removeEventListener('click', this._closeHandler);
  }

  _closeHandler() {
    if (this._timeout) clearTimeout(this._timeout);
    const alertDiv = this.shadowRoot.querySelector('.alert');
    alertDiv.classList.remove('visible');
    alertDiv.addEventListener('transitionend', () => this.remove());
  }
}

customElements.define('custom-alert', CustomAlert);

// A helper function to easily create and show our new component.
function showAlert(
  message = 'Message Header',
  subtext = 'Message subtext',
  type = 'success',
  duration = 3000,
  position = 'top-center',
  showClose = false,
  width,
  icon = '',
  showIcon = false
) {
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
// Event listener to trigger the alert
document.getElementById('show-icon-closable-alert-success').addEventListener('click', () => {
  showAlert(
    'Success',
    'This is success description',
    'success',
    3000,
    'top-center',
    true,
    '600px',
    null,
    true
  );
});
document.getElementById('show-icon-closable-alert-info').addEventListener('click', () => {
  showAlert(
    'Info',
    'This is info description',
    'info',
    3000,
    'top-center',
    true,
    '600px',
    null,
    true
  );
});
document.getElementById('show-icon-closable-alert-warning').addEventListener('click', () => {
  showAlert(
    'Warning',
    'This is warning description',
    'warning',
    3000,
    'top-center',
    true,
    '600px',
    null,
    true
  );
});
document.getElementById('show-icon-closable-alert-error').addEventListener('click', () => {
  showAlert(
    'Error',
    'This is error description',
    'error',
    3000,
    'top-center',
    true,
    '600px',
    null,
    true
  );
});
`,
codePen: "https://codepen.io/praveen-sripati/pen/raVrpwE"
}