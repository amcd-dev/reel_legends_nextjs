import {useState} from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


//TODO component imports, combine into one import
import {MapModal} from "../components/map_modal";
import {Log} from "./log"
import {Environment} from "./environment";

//Font imports


export default function Home() {
    const [showMap, setShowMap] = useState(false);

    return (
        <div className={styles.container}>
            <Head>
                <title>Reel Legends (Next.js)</title>
                <meta name="idle fishing game created by Andy" content="Created using React, Next.js and Node.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <h1>Reel Legends</h1>
                <h2>A Fishing Adventure</h2>
            </header>

            <main className={styles.main}>
                <section className={styles.menuBar}>
                    <button onClick={() => setShowMap(true)}>Map</button>
                    <button className={styles.button}>Player</button>
                    <button>Inventory</button>
                    <button>Shop</button>
                    <button>Quests</button>
                    <button>Achievements</button>
                    <button>Stats</button>
                    <button>Guide</button>
                </section>
                <section className={styles.gameGrid}>
                    <section className={styles.loadoutBar}>
                        <h1>loadout placeholder</h1>
                    </section>
                    <Environment />
                    <Log />
                    <MapModal onClose={() => setShowMap(false)} show={showMap}  />
                </section>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}
