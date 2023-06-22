import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Search from './search'

export default function Home() {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract VulnDb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://onedb.org">Smart Contract VulnDb</a>
        </h1>

        <Search></Search>

        <p className={styles.description}>
          Get started by running a search for{' '}
          <code className={styles.code}>erc20</code>
        </p>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
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
