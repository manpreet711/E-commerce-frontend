import { API } from "../../backend";

export const createOrder = (userId, token, orderDdata) => {
  return fetch(`${API}/order/create/:${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderDdata }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
