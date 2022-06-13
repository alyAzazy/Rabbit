import { useState, useRef } from "react";
import * as axios from 'axios';
import { useRouter } from "next/router";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function Product(props) {
  const Router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  // const PUBLIC_KEY= "pk_test_51L3VYgKqeiMl7ByHxz6yT5y2hd1T44bZfIScbgz50JkJkbuStKovE8r1aaDnXKThgdjjda0loltrXPQ8tjoE5bIH00894ZjJ2j";
  // const stripeTestPromise= loadStripe(PUBLIC_KEY);


  const [success, setSuccess] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [message, setMessage] = useState('');
  const {
    id,
    name,
    size,
    image,
    slug,
    price,
    stock,
    category,
    measurement,
    weight,
  } = props;

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" }
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  };

  const amount = price
  //console.log(amount);
  const handleNewOrder = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })
    console.log(error);
    if (!error) {
      try {
        const { data } = await axios.default.post('https://test-order.vercel.app/api/orders', {
          "amount": amount,
          "email": customerEmail,
          "product_id": id,
          name: "test",
          price: 0
        });
        if (data) {
          setSuccess(true)

          setMessage(`Success! Please check your order ID in your email`);
        }
      } catch (error) {
        setMessage("Error " + error)
      }
    }
    else {
      setMessage("Error hi")
    }

  };



  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96 ">
          <img className="h-full w-full rounded-md object-cover max-w-lg mx-auto" src={image} alt="" />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2 lg:py-12">
          <h3 className="text-3xl leading-7 mb-2 font-bold uppercase lg:text-5xl">
            {name}
          </h3>
          <span className="text-2xl leading-7 font-bold mt-3">
            {(stock > 0) ? "$" + price : "Out Of Stock"}
          </span>
          <br>
          </br>
          <br>
          </br>

          <div>
            {/* <Elements stripe= {stripeTestPromise}> */}
            {!success ?
              <form onSubmit={handleNewOrder}>
                <div>
                  <div className="email" >
                    <li>Please enter your email</li>
                    <input onChange={event => setCustomerEmail(event.target.value)} value={customerEmail} type="text" />
                  </div>
                </div>
                <fieldset className='FormGroup'>
                  <div className='FormRow'>
                    <CardElement options={CARD_OPTIONS} />
                  </div>
                </fieldset>
                <div className="mt-12 flex flex-row justify-between ">
                  <button
                    disabled={stock == 0}
                    className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
                    onClick={handleNewOrder}
                  >
                    Order Product
                  </button>
                </div>
              </form> :
              <div>
                <h2></h2>
              </div>
            }
            {/* </Elements> */}
          </div>

          <div>
            <span className="text-red-600 leading-7 font-bold mt-3">
              {message}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Category</h3>
        {category}
      </div>
    </div>
  );
}
//
export default Product;