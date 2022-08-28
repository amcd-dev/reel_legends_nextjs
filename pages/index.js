import {useEffect, useState} from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

//TODO component imports, combine into one import
import {MapModal} from "../components/map_modal";
import {Log} from "./log"
import {Environment} from "./environment";
import {CatchModal} from "../components/catch_modal";
import {LoadoutBar} from "../components/loadout_bar";

//Global Functions


//API Calls
//TODO move to another module & import
let apiPath = () => {
    if (location.hostname === 'localhost') {
        return 'http://127.0.0.1:3001';
    } else {
        return 'https://reelalpha.herokuapp.com'
    }
}

export default function Home() {
    const [latestFish, setLatestFish] = useState({})
    const [playerState, setPlayerState] = useState({})
    const [playerLoadoutState, setPlayerLoadoutState] = useState({})
    const [playerLoadoutExpandedState, setPlayerLoadoutExpandedState] = useState([{},{},{}])
    const [loggedEvents, setLoggedEvents] = useState([])

    // console.log('>>> [Page render or update] Logging latestFish state', latestFish)
    // console.log('>>> [Page render or update] Logging loggedEvents array', loggedEvents)
    // console.log('>>> [Page render or update] Logging playerState state', playerState)
    // console.log('>>> [Page render or update] Logging playerLoadoutState state', playerLoadoutState)
    // console.log('>>> [Page render or update] Logging playerLoadoutExpandedState state', playerLoadoutExpandedState)

    {/* Modal States */}
    const [showMap, setShowMap] = useState(false);
    const [showCatch, setShowCatch] = useState(false)

    {/* Functions */}
    async function handleCastClick () {
        // console.log('>>> [1] initialising handleCastClick & starting getFish fetch')
        const response = await fetch(`${apiPath()}/getFish`)
        const newFish = await response.json()
        // console.log('>>> [2] setting states for loggedEvents and latestFish')
        setLoggedEvents(current => [...current, newFish])
        setLatestFish(newFish)
        setShowCatch(true)
    }

    // async function getPlayerState() {
    //     console.log('>>> [1] initialising getPlayerState and starting playerState fetch')
    //     const response = await fetch(`${apiPath()}/getPlayerState`)
    //     const newState = await response.json()
    //     console.log('>>> [2] setting states for playerState')
    //     setPlayerState(newState)
    // }

    // async function getPlayerLoadout() {
    //     console.log('>>> [1] initialising getPlayerLoadout and starting loadout fetch')
    //     const response = await fetch(`${apiPath()}/getLoadoutState/1`) //TODO make dynamic for '1' to ID
    //     const newState = await response.json()
    //     console.log('>>> [2] setting states for playerLoadout')
    //     setPlayerLoadoutState(newState)
    // }

    async function getPlayerLoadoutExpanded() {
        // console.log('>>> [1] initialising getPlayerLoadout and starting loadout fetch')
        const response = await fetch(`${apiPath()}/getLoadoutStateExpanded`) //TODO make dynamic for '1' to ID
        const newState = await response.json()
        // console.log('>>> [2] setting states for playerLoadout')
        setPlayerLoadoutExpandedState(newState)
    }

    {/* useEffects */}
    useEffect(() => {
        getPlayerLoadoutExpanded()
    }, [latestFish])

    return (
        <div className={styles.container}>
            <Head>
                <title>Reel Legends (Next.js)</title>
                <meta name="idle fishing game created by Andy" content="Created using React, Next.js and Node.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className={styles.mainHead}>
                <h1>Reel Legends</h1>
                <h2>A Fishing Adventure</h2>
            </header>

            <main className={styles.main}>
                <section className={styles.menuBar}>
                    <button onClick={() => setShowMap(true)}>Map</button>
                    <button>Player</button>
                    <button>Inventory</button>
                    <button>Shop</button>
                    <button>Quests</button>
                    <button>Achievements</button>
                    <button>Stats</button>
                    <button>Guide</button>
                </section>
                <LoadoutBar loadout={playerLoadoutExpandedState} />
                {/* ----- Game Grid ----- */}
                <section className={styles.gameGrid}>
                    <section className={styles.loadoutBar}>
                        <h1>loadout placeholder</h1>
                    </section>
                    <button className={styles.castButton} onClick={handleCastClick}>Cast</button>
                    <Log catchEvent={loggedEvents}/>
                    <Environment />
                    <MapModal onClose={() => setShowMap(false)} show={showMap}  />
                    <CatchModal latestCatch={latestFish} onClose={() => setShowCatch(false)} show={showCatch} />
                </section>
                {/* ----- Game Grid ----- */}
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}
