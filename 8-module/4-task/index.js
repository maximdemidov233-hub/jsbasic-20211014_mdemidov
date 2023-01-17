import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.renderModal()

    this.addEventListeners();
  }

  addProduct(product) {
    // ваш код
    let cartItem = this.cartItems.find(item => item.product.id == product.id);

    if (!cartItem) {
      this.cartItems.push({
        product,
        count: 1
      });
    }
    else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);

  }

  updateProductCount(productId, amount) {
    // ваш код
    let cartItem = this.cartItems.find(item => item.product.id == productId);

    console.log(cartItem)

    cartItem.count += amount;

    if (cartItem.count == 0) {
      console.log(123)
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код
    let totalCount = 0;
    this.cartItems.forEach((item) => {
      totalCount += item.count;
    });

    return totalCount;
  }

  getTotalPrice() {
    // ваш код
    let totalPrice = 0;
    this.cartItems.forEach((item) => {
      let quantity = item.count;
      let price = item.product.price;
      let itemCost = quantity * price;
      totalPrice += itemCost;
    });

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modalBody = document.createElement('div');

    for (let { product, count } of this.cartItems) {
      this.modalBody.append(this.renderProduct(product, count));
    }

    this.modalBody.append(this.renderOrderForm());

    this.modalBody.addEventListener("click", this.onModalBodyClick);

    this.modalBody.querySelector("form").onsubmit = (event) => this.onSubmit(event);

    this.modal.setBody(this.modalBody);

    this.modal.elem.addEventListener('modal-close', () => {
      this.modal = null;
      this.modalBody = null;
    });

    this.modal.open();

  }

  onProductUpdate(cartItem) {
    // ...ваш код

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

