import React, { useEffect, useState } from 'react';
//import "./Pay.Scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import newRequest from './../../utils/newRequest';
import CheckoutForm from '../../components/checkoutForm/checkoutForm';
import { useMutation } from '@tanstack/react-query';

const stripePromise = loadStripe("pk_test_51OAnT1FeOqgkVCRmnGeg4q6V5P86qiqimKZMvLhIW1EcQHSQxcpolW6TCRs26CatCPtxO6xnaZLjK7FNloe16H7Y006XagIP3Z");

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(
                    `orders/create-payment-intent/${id}`
                );
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.log(err);
            }
        };
        makeRequest();
        mutation.mutate(id)
    }, []);

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

      const mutation = useMutation({
        mutationFn: (id) => {
          return newRequest.delete(`/cart/${id}`);
        }
      });

  return (
    <div className='pay'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay
