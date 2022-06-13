import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as axios from 'axios';
import { useEffect, useState } from "react";

export default function Home() {

  const [message, setMessage] = useState('');
  //const[OrderStatus,setOrderStatus]= useState("");
  //const[order_id,setOrder_id]=useState("")
  async function submitContact(event) {
    event.preventDefault();
    const order_id = event.target.order_id.value;
    // console.log(order_id);
    const { data } = await axios.default.get(`https://shipping-red.vercel.app/api/shipments/${order_id}`, {
    });
    if (data) {
      console.log(data);
      setMessage(`Success! Your shipment status is: ${data.shipment_status}`);
    }else {
      setMessage("Wrong product ID, Please try again");
    }
    
  };
  /*async function cancelOrder(event) {
    event.preventDefault();
    const order_id = event.target.order_id.value;
    console.log(order_id);
    const { data } = await axios.default.delete("https://shipping-red.vercel.app//api/shipments",{headers: 
    {
     'Content-Type': 'application/json'
    },
      "order_id":order_id
    });
    if(data){
      //setOrderStatus(data.order_status)
      setMessage(`Your shipment status is: ${data.shipment_status}`)
    }
    console.log(data);
  };*/

  return (
    <div className={styles.container}>
      <Head>
        <title>shipment</title>


      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a > rabbit mart</a>
        </h1>

        <div className={styles.description}>
          Please enter your product ID to "Track your order"
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <form className="example" onSubmit={submitContact} >
            <input id="order_id" type="text" placeholder="Search.." name="search" />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
          Please enter your product ID to "Cancel your order"
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <form /*className="example" onSubmit={cancelOrder}*/ >
            <input id="order_id" type="text" placeholder="Search.." name="search" />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
          <div>
            <span className="text-red-600 leading-7 font-bold mt-3">
              {message}
            </span>
          </div>
        </div>

      </main>

      <footer className={styles.footer}>
        <a

        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}