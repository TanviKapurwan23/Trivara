// Initialize cart and total price from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  // Update Cart UI on page load
  updateCartUI(cart, totalPrice);
});

// Function to update the Cart UI
function updateCartUI(cart, totalPrice) {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceSpan = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout");

  // Check if cart is empty
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.style.display = "none";
  } else {
    // Generate cart items dynamically
    cartItemsDiv.innerHTML = cart
      .map(
        (item, index) =>
          `<div class="cart-item">
              <p>${item.name} - $${item.price.toFixed(2)}</p>
              <button onclick="removeFromCart(${index})">Remove</button>
            </div>`
      )
      .join("");
    checkoutBtn.style.display = "block";
  }

  // Update total price
  totalPriceSpan.innerText = totalPrice.toFixed(2);
}

// Function to remove items from the cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  // Update cart and total price
  totalPrice -= cart[index].price;
  cart.splice(index, 1);

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalPrice", totalPrice.toFixed(2));

  // Update UI
  updateCartUI(cart, totalPrice);
}

// Function for checkout
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Add some items before checking out!");
    return;
  }

  alert("Thank you for your purchase! Your order has been placed.");

  // Clear the cart and localStorage
  localStorage.removeItem("cart");
  localStorage.removeItem("totalPrice");

  // Reset UI
  updateCartUI([], 0);
  document.getElementById("cart-count").innerText = 0;
}
