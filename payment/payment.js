document.addEventListener("DOMContentLoaded", () => {
  const sweetPrices = {
    "Peda": 0.07,
    "Ladoo": 0.05,
    "Khurma": 0.08,
    "gulab-jamun": 0.06,
    "Laddu": 0.07,
    "rasmalai": 0.07,
  };

  const sweetSelect = document.getElementById("sweet");
  const gramInput = document.getElementById("grams");
  const totalPriceDisplay = document.getElementById("total-price");
  let totalPrice = 0; // Global variable to hold the total price

  function updatePrice() {
    const selectedSweet = sweetSelect.value;
    const grams = parseInt(gramInput.value) || 0;

    if (selectedSweet) {
      const pricePerGram = sweetPrices[selectedSweet];
      totalPrice = pricePerGram * grams; // Update the global total price
      totalPriceDisplay.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
    } else {
      totalPrice = 0;
      totalPriceDisplay.textContent = `Total Price: ₹0.00`;
    }
  }

  // Update price whenever the selection or grams change
  sweetSelect.addEventListener("change", updatePrice);
  gramInput.addEventListener("input", updatePrice);

  // Razorpay payment integration
  var options = {
    "key": "rzp_test_lOH4xUg5yp2EXI", // Replace with your Razorpay Key ID
    "amount": "0", // This will be updated dynamically
    "currency": "INR",
    "description": "Mahajan Peda Bhandar Payment",
    "image": "example.com/image/rzp.jpg",
    "prefill": {
      "email": "user@example.com",
      "contact": "+919900000000",
    },
    config: {
      display: {
        blocks: {
          banks: {
            name: 'Most Used Methods',
            instruments: [
              {
                method: 'wallet',
                wallets: ['freecharge']
              },
              {
                method: 'upi'
              },
            ],
          },
        },
        sequence: ['block.banks'],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
    "handler": function (response) {
      alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
    },
    "modal": {
      "ondismiss": function () {
        if (confirm("Are you sure, you want to close the form?")) {
          console.log("Checkout form closed by the user");
        } else {
          console.log("Complete the Payment");
        }
      }
    }
  };

  var rzp1 = new Razorpay(options);

  document.getElementById('rzp-button1').onclick = function (e) {
    e.preventDefault();

    // Convert totalPrice to paise (₹1 = 100 paise)
    const amountInPaise = Math.round(totalPrice * 100);

    if (amountInPaise > 0) {
      options.amount = amountInPaise; // Set the amount dynamically
      rzp1 = new Razorpay(options); // Create a new Razorpay instance with the updated amount
      rzp1.open();
    } else {
      alert("Please select a sweet and enter a valid quantity to proceed.");
    }
  };
});
