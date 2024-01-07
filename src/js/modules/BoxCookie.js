class BoxCookie {
  constructor() {
    this.cookieButton = document.querySelector('.js-cookie-btn-close');
    this.cookieBox = document.querySelector('.box-cookie');

    if (this.cookieButton && this.cookieBox) {
      this.cookieButton.addEventListener('click', () => this.cookieClose());
    }
  }

  cookieClose = () => {
    this.cookieBox.classList.add('is-hidden');
  }
}

export default BoxCookie;