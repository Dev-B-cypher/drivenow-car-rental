<<<<<<< HEAD
function payNow(order) {
  const options = {
    key: 'YOUR_PUBLIC_KEY', // Replace with real one
    amount: order.amount,
    currency: order.currency,
    name: "DriveNow",
    description: "Car Booking",
    order_id: order.id,
    handler: function (response) {
      alert("Payment successful!");
    },
    theme: { color: "#3399cc" }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}
=======
function payNow(order) {
  const options = {
    key: 'YOUR_PUBLIC_KEY', // Replace with real one
    amount: order.amount,
    currency: order.currency,
    name: "DriveNow",
    description: "Car Booking",
    order_id: order.id,
    handler: function (response) {
      alert("Payment successful!");
    },
    theme: { color: "#3399cc" }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}
>>>>>>> 1fba35f46b7f620ea1ee9d6776f39b261696820a
