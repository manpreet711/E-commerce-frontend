const { API } = require("../../backend");

export const getMeToken = async (userId, token) => {
    console.log('Sending request to backend backend');
    console.log('user id while sending', userId)
    console.log(' Token while sending', token)
  try {
    const response = await fetch(`${API}/payment/gettoken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response0', response);
    return await response.json();
  } catch (err) {
    return console.log("err", err);
  }
};
export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}/payment/payPal/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("err", err));
};
