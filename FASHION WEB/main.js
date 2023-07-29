// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// open cart
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

// close cart
closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// cart working js
document.addEventListener("DOMContentLoaded", ready);

// function
function ready() {
  // remove items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  // buy button
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// buy button
function buyButtonClicked() {
  var cartContent = document.querySelector(".cart-content");

  // Check if the cart is empty
  if (cartContent.children.length === 0) {
    alert("Cart cannot be empty. Please add items to your cart.");
    return;
  }

  Swal.fire({
    title: 'Your order is placed',
    showCancelButton: false,
    confirmButtonColor: 'rgb(254, 208, 123)', // Replace with your desired hexadecimal color code
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  });

  while (cartContent.firstChild) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

// remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  var cartItem = buttonClicked.parentElement;
  cartItem.remove();
  updateTotal();
}

// quantity change
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement.parentElement;
  var title = shopProducts.querySelector(".product-title").innerText;
  var price = shopProducts.querySelector(".price").innerText;
  var productImg = shopProducts.querySelector(".product-img").src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.querySelector(".cart-content");
  var cartItemsName = cartItems.getElementsByClassName(
    "cart-product-title"
  );
  for (var i = 0; i < cartItemsName.length; i++) {
    if (cartItemsName[i].innerText === title) {
      alert("You have already added this item to the cart");
      return;
    }
  }

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <!--Remove Cart-->
    <i class='bx bxs-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  // Display notification
  Swal.fire({
    title: 'Item Added',
    text: 'The item has been added to your cart.',
    icon: 'success',
    timer: 2000,
    showConfirmButton: false
  });

  updateTotal();
}

// update total
function updateTotal() {
  var cartBoxes = document.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.querySelector(".cart-price");
    var quantityElement = cartBox.querySelector(".cart-quantity");
    var price = parseFloat(priceElement.innerText.replace("₱", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  document.querySelector(".total-price").innerText = "₱" + total;
}

// Get the navbar element
const navbar = document.getElementById("navbar");

// Variables to store the previous scroll position and direction
let prevScrollPos = window.pageYOffset;
let currentScrollPos;

// Function to handle the scroll event
function handleScroll() {
  currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Scrolling up
    navbar.classList.remove("navbar-hidden");
    navbar.classList.remove("navbar-visible");
  } else {
    // Scrolling down
    navbar.classList.add("navbar-hidden");
    navbar.classList.add("navbar-visible");
  }

  prevScrollPos = currentScrollPos;
}

// Add event listener for the scroll event
window.addEventListener("scroll", handleScroll);

// JavaScript code to handle scroll event
var prevScrollpos = window.pageYOffset;
var timeout = null;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    // Scrolling up
    document.querySelector("header").classList.add("navbar-visible");
  } else {
    // Scrolling down
    document.querySelector("header").classList.remove("navbar-visible");
  }
  prevScrollpos = currentScrollPos;
};