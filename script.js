// Initialize cart and total price from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

// Update UI initially
updateCartUI();

// Function to add items to the cart
function addToCart(productName, productPrice, productImage) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  cart.push({ name: productName, price: productPrice, image: productImage });
  totalPrice += productPrice;

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalPrice", totalPrice.toFixed(2));

  document.getElementById("cart-count").innerText = cart.length;

  alert(`${productName} has been added to your cart.`);
}

// Function to update the Cart UI
function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceSpan = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.style.display = "none";
  } else {
    cartItemsDiv.innerHTML = cart
      .map(
        (item, index) => `
            <div class="cart-item">
              <img src="${item.image}" alt="${
          item.name
        }" class="cart-item-image" />
              <div class="cart-item-details">
                <p><strong>${item.name}</strong></p>
                <p>Price: $${item.price.toFixed(2)}</p>
              </div>
              <button onclick="removeFromCart(${index})">Remove</button>
            </div>
          `
      )
      .join("");
    checkoutBtn.style.display = "block";
  }

  totalPriceSpan.innerText = totalPrice.toFixed(2);
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
// Function to remove items from the cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  totalPrice -= cart[index].price;
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalPrice", totalPrice.toFixed(2));

  updateCartUI();
}

// Function for checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add some items before checking out!");
    return;
  }

  alert("Thank you for your purchase! Your order has been placed.");

  // Clear the cart and localStorage
  cart = [];
  totalPrice = 0;
  localStorage.removeItem("cart");
  localStorage.removeItem("totalPrice");

  // Reset UI
  updateCartUI();
  document.getElementById("cart-count").innerText = 0;
}
function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  const customerName = prompt("Enter your name:");
  const customerEmail = prompt("Enter your email:");

  if (!customerName || !customerEmail) {
    alert("Name and email are required to place the order!");
    return;
  }

  const orderDetails = {
    customerName,
    customerEmail,
    cartItems: cart,
    totalPrice,
  };

  // Send order details to backend
  fetch("http://localhost:5000/place-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderDetails),
  })
    .then((response) => {
      if (response.ok) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        localStorage.removeItem("totalPrice");
        document.getElementById("cart-count").innerText = 0;
        updateCartUI();
      } else {
        alert("Failed to place the order. Try again.");
      }
    })
    .catch((error) => console.error("Error placing order:", error));
}
