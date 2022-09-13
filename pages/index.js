//####### original start in package.json {
//   "name": "rl_frontend_njs",
//   "version": "0.1.0",
//   "private": true,
//   "scripts": {
//     "dev": "next dev",
//     "build": "next build",
//     "start": "next start",
//     "lint": "next lint"
//   },
import {useEffect, useState} from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

//TODO component imports, combine into one import
import {MapModal} from "../components/map_modal";
import {Log} from "../components/log"
import {Environment} from "../components/environment";
import {CatchModal} from "../components/catch_modal";
import {LoadoutBar} from "../components/loadout_bar";
import {QuestsModal} from "../components/quests_modal";

//Global Functions
function renderQualityColour(caughtQuality) {
    switch (caughtQuality) {
        case 'Common':
            return styles.common;
        case 'Uncommon':
            return styles.uncommon;
        case 'Rare':
            return styles.rare;
        case 'Exceptional':
            return styles.exceptional;
        case 'Legendary':
            return styles.legendary;
        case 'Mythical':
            return styles.mythical;
        case 'Ancient':
            return styles.ancient;
    }
}

//API Calls
//TODO move to another module & import
export let apiPath = () => {
    if (location.hostname === 'localhost') {
        return 'http://127.0.0.1:3001';
    } else {
        return 'https://reelalpha.herokuapp.com'
    }
}

export default function Home() {
    const [trigger, setTrigger] = useState([])

    const [latestFish, setLatestFish] = useState({})
    const [playerState, setPlayerState] = useState({})
    const [inventoryState, setInventoryState] = useState([])
    const [questState, setQuestState] = useState([])
    const [loggedEvents, setLoggedEvents] = useState([])
    const [releaseLog, setReleaseLog] = useState([])

    // console.log('>>> [Page render] Logging latestFish state', latestFish)
    // console.log('>>> [Page render] Logging loggedEvents array', loggedEvents)
    // console.log('>>> [Page render] Logging playerState state', playerState)
    // console.log('>>> [Page render] Logging inventory state', inventoryState)
    console.log('>>> [Page render] Logging quest state', questState)
    // console.log('>>> [Page render] Logging Release Event Log', releaseLog)

    {/* Modal States */}
    const [showMap, setShowMap] = useState(false);
    const [showCatch, setShowCatch] = useState(false)
    const [showQuests, setShowQuests] = useState(false)

    {/* Functions */}
    async function handleCastClick () {
        // console.log('>>> [1] initialising handleCastClick & starting getFish fetch')
        const response = await fetch(`${apiPath()}/getFish`)
        const newFish = await response.json()
        // console.log('>>> [2] setting states for loggedEvents and latestFish')
        // setLoggedEvents(current => [...current, newFish])
        handleCatchLog(newFish)
        setLatestFish(newFish)
        setShowCatch(true)
        setTrigger(current => [...current, 1])
    }

    function handleReleaseLog (fishDetails) {
        const releaseText = `#release# You decide to instead release the ${fishDetails.caught_weight_lbs}lb ${fishDetails.caught_name}`
        setReleaseLog(current => [...current, releaseText])
    }

    function handleCatchLog (fishDetails) {
        const catchText = [
            '#cast# you caught ',
            fishDetails.caught_quality.charAt(0) === 'U' || fishDetails.caught_quality.charAt(0) === 'E' ? 'an ' : 'a ',
            <span key={fishDetails.id} className={renderQualityColour(fishDetails.caught_quality)}>{fishDetails.caught_quality}</span>,
            ' [',
            fishDetails.caught_name,
            '] ',
            'weighing ',
            fishDetails.caught_weight_lbs,
            'lbs'
        ]

        setReleaseLog(current => [...current, catchText])
    }

    // async function getPlayerState() {
    //     console.log('>>> [1] initialising getPlayerState and starting playerState fetch')
    //     const response = await fetch(`${apiPath()}/getPlayerState`)
    //     const newState = await response.json()
    //     console.log('>>> [2] setting states for playerState')
    //     setPlayerState(newState)
    // }

    async function getInventory() {
        const response = await fetch(`${apiPath()}/getPlayerInventory/1`); //TODO make dynamic for '1' to ID
        const newState = await response.json();
        setInventoryState(newState);
    }

    async function getQuestUpdate() {
        const response = await fetch(`${apiPath()}/getQuests/1`); //TODO make dynamic for '1' to ID
        const newState = await response.json();
        setQuestState(newState);
    }

    {/* useEffects */}
    useEffect(() => {
        // console.log('>>> Main page useEffect ran')
        getInventory();
        getQuestUpdate()
    }, [latestFish]);

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
                    <button onClick={() => setShowQuests(true)}>Quests</button>
                    <button>Achievements</button>
                    <button>Stats</button>
                    <button>Guide</button>
                </section>
                <LoadoutBar className={styles.loadoutBar} inventory={inventoryState}  />
                {/* ----- Game Grid Start ----- */}
                <section className={styles.gameGrid}>
                    <button className={styles.castButton} onClick={handleCastClick}>Cast</button>
                    <Log catchEvent={loggedEvents}
                         releaseEvent={releaseLog}
                    />
                    <Environment />
                    <MapModal show={showMap}
                              onClose={() => setShowMap(false)}
                    />
                    <QuestsModal show={showQuests}
                                 currentQuests={questState}
                                 onClose={() => setShowQuests(false)}
                                 forceUpdate={trigger}
                    />
                    <CatchModal show={showCatch}
                                latestCatch={latestFish}
                                releaseEvent={() => handleReleaseLog(latestFish)}
                                onClose={() => setShowCatch(false)}
                    />
                </section>
                {/* ----- Game Grid End ----- */}
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}
