/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { getMeToken, processPayment } from "./helper/paymentBhelper";
import { isAutheticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { API } from "../backend";

const PaymentB = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAutheticated() && isAutheticated().user._id;
  console.log("USERID", userId);

  const token = isAutheticated() && isAutheticated().token;
  console.log("TOKEN", token);

  const getToken = async (userId, token) => {
    // try {
    //   const response = await fetch(
    //     `${API}/payment/gettoken/${
    //       isAutheticated() && isAutheticated().user._id
    //     }`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${
    //           isAutheticated() && isAutheticated().token
    //         }`,
    //       },
    //     }
    //   );
    //   console.log("response0", response);
    //   return response.json();
    // } catch (err) {
    //   return console.log("err", err);
    // }

    getMeToken(
      isAutheticated() && isAutheticated().user._id,
      isAutheticated() && isAutheticated().token
    )
      .then((info) => {
        console.log("INFORMATION", info);
        if (info && info.error) {
          console.log("ERROR LOG: ", info?.error);
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info && info.clientToken ? info.clientToken : "";
          console.log("CLIENTTOKEN", clientToken);
          setInfo({ clientToken });
        }
      })
      .catch((err) => console.log("Token sending error", err));
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3> Please signin or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken();
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log("paymnt response", response);
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          cartEmpty(() => {
            console.log("empty cart");
          });
          setReload(!reload); 
          // ADD THIS OUTSID THEN 
          const orderData = {
            products: products,
            transaction_id: response.transaction_id,
            amount: response.transaction.amount,
          };
          console.log('ORDER DATAA', orderData)

          createOrder(userId, token, orderData)
            .then((res) => {
              console.log("Orderd rsponse", res);
            })
            .catch((err) => {
              console.log("error in creat order", err);
            });

          
        })
        .catch((error) => {
          console.log("PAYMENT FAILED");
          setInfo({ loading: false, success: false });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
    {/*{userId && token
      ? ((<h3> Your Bill is {getAmount()} $</h3>), showbtdropIn())
      : products.length > 0 && (
          <Link to="/signin">
            <button className="btn btn-info">
              Please Signin to continue with payment
            </button>
          </Link>
      )}*/}
    <h3> Your Bill is {getAmount()} $</h3>
    {showbtdropIn()}
    </div>
  );
};

export default PaymentB;
