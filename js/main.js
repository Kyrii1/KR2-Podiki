const dialog = document.getElementById('order-dialog');
const openButton = document.getElementById('open-order-dialog');
const closeButton = document.getElementById('close-order-dialog');
const form = document.getElementById('order-form');
const message = document.getElementById('form-message');

if (dialog && openButton && closeButton) {
  openButton.addEventListener('click', () => dialog.showModal());
  closeButton.addEventListener('click', () => dialog.close());
}

if (form && message) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      message.hidden = false;
      form.reset();
    }
  });
}
