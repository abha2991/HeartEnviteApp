import RazorpayCheckout from "react-native-razorpay";

export async function payment(price, userName, cardId) {
  console.log({ price, userName, cardId });
  const userData = {
    price: price,
    userName: userName,
  };
  const res = await fetch(`http://localhost:3001/api/paymentgateway/orderId`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  });

  const orderDetails = await res.json();

  const options = {
    description: "Credits towards consultation",
    image: "https://i.imgur.com/3g7nmJC.jpg",
    currency: "INR",
    key: "rzp_test_g5mVREbtx16Zdy",
    amount: price * 100,
    name: userName,
    order_id: orderDetails?.createdOrdetDetails?.orderId,
    prefill: {
      email: "Ezea@zeabros.com",
      contact: "9191919191",
      name: "Ezea group",
    },
    theme: { color: "#53a20e" },
  };
  RazorpayCheckout.open(options)
    .then((data) => {
      // handle success

      const successData = {
        cardId: cardId,
        orderCreationId: orderDetails?.createdOrdetDetails?.orderId,
        razorpayPaymentId: data.razorpay_payment_id,
        razorpayOrderId: data.razorpay_order_id,
        razorpaySignature: data.razorpay_signature,
      };

      const result = fetch(
        "http://localhost:3001/api/paymentgateway/paymentSuccess",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(successData),
        }
      ).then((data) => data.json());

      console.log({ result });
      //
      // const d = result.json();
      // console.log({ d });
      // if (result.status === 401) {
      //   alert(`Unsuccessful: Please try again!!!`);
      // } else {
      alert(`Success: Payment Done Successfully!!`);
      //}
    })
    .catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
}
