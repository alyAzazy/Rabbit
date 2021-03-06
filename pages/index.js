import { useEffect, useState } from "react";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Products from '../components/Products';

function Home() {
  const [ products, setProducts ] = useState([]);
  const [ viewedProducts, setViewedProducts ] = useState([])
  const router = useRouter();

  useEffect(() => {
    const response = fetch('https://api-cyramp864-alyelazazy-giu-unide.vercel.app/api/').then((res) => res.json()).then((data) => {
      setProducts(data);
      setViewedProducts(data);
    });
  }, []);

  function searchProducts(event){
    event.preventDefault();
    const searchName = event.target.name.value;
    console.log(searchName);
    setViewedProducts(products.filter((product, i, a) => {
      return product.name.toLowerCase().includes(searchName.toLowerCase());
    }));
   }
   
  if (!router.isFallback && !products) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="my-8 bg-primary">
      <Head>
        <title>GIU SE Marketplace Example</title>
        <meta
          name="GIU SE"
          content="Rabbit Mart Marketplace"
        />
      </Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <form className="example" onSubmit={searchProducts} >
        <input id = "name" type="text" placeholder="Search.." name="search"/>
        <button type="submit"><i className="fa fa-search"></i></button>
      </form>
      <div>
        <a className="shipping-link" href="/shipping">Check Shipping Status</a>
      </div>
      

      <div className="mt-4">
        <Products products={viewedProducts} />
      </div>
    </div>
  );
}


export default Home;
