import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>shipment</title>
        
       
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a > rabbit mart</a> 
        </h1>

        <p className={styles.description}>
          Get started by tracking your order <input type="text" placeholder="Search.." id = "searchbox"></input>
          <button
              className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
              //onClick={(e) => handleOrderCancellation (e)}
            >
              check order status
            </button>
          <button
              className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
              //onClick={(e) => handleOrderCancellation (e)}
            >
              Cancel Order
            </button>
        </p>
      
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