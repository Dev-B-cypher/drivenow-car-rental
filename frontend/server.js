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
