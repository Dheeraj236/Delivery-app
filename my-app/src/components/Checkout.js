import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
export default function Checkout({ subtotal }) {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();
  function tokenHander(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Your Order Placed Successfully" />}

      {currentUser ? (
        <StripeCheckout
          amount={subtotal * 100}
          shippingAddress
          token={tokenHander}
          stripeKey="pk_test_51LTgBZSB7zH8y98BBhdqSiLdC06Vh0Bvc2zPrdhyPgQyCFSQ3OM2BhNdrF50vUW17xYxrrvADhUuLO0spyG43FTk00YrV2aGvL"
          currency="INR"
        >
          <button className="btn">Pay Now</button>
        </StripeCheckout>
      ) : (
        <button className="btn">Login to Pay</button>
      )}
    </div>
  );
}