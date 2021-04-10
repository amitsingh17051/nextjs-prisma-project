import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'


import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export default function Home({ data }) {

  const [formData, setFormData] = useState({});
  
  async function saveProduct(e) {
    e.preventDefault();

    const response = await fetch('/api/products', {
      method:'POST',
      body: JSON.stringify(formData)
    })

    console.log(JSON.stringify(formData))
    return await response.json();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Kashvee Designs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <h1>Kashvee Products</h1>
          <ul className={styles.products}>
            {data.map(item => (
              <li key="item.id" className={styles.product}>
                  <span><img src={item.images} width="100px"/></span>
                  <span>&#8377;  <strong>{item.price}</strong></span>
                  <span><strong>{item.title}</strong></span>
                  <span className={styles.desc} >{item.description}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={saveProduct} method="post" className={styles.form}>

              <input type="text" name="title" placeholder="Product Name" onChange={e => setFormData({...formData, title:e.target.value })}/>

              <input type="text" name="price" placeholder="Product Price" onChange={e => setFormData({...formData, price: +e.target.value })}/>

              

              <input type="text" name="images" placeholder="Product Images" onChange={e => setFormData({...formData, images:e.target.value })}/>

              <textarea name="description" id="" cols="30" rows="10" placeholder="Product Description" onChange={e => setFormData({...formData, description: e.target.value })}></textarea>

              <input type="text" name="slug" placeholder="Product slug" onChange={e => setFormData({...formData, slug: e.target.value })}/>

              <button type="submit">Add Product</button>

          </form>

      </main>
    </div>
  )
}



export async function getServerSideProps() {

  const products = await prisma.products.findMany();
  return {
    props: {
      data: products,
    }
  }

}
