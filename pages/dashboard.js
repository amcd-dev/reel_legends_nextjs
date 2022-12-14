
import {useEffect, useState} from "react";
import { useAuth } from "../context/authContext";
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

    const { user } = useAuth()
    // console.log('>>> Logging user details: ', user)

    const [latestFish, setLatestFish] = useState({})
    const [playerState, setPlayerState] = useState({})
    const [inventoryState, setInventoryState] = useState([])
    const [unlockedLocations, setUnblockedLocations] = useState()
    // console.log('>>> [Page render] Logging unlocked locations state', unlockedLocations)
    // console.log('>>> [Page render] Logging playerState state', playerState)

    const [loggedEvents, setLoggedEvents] = useState([])
    const [releaseLog, setReleaseLog] = useState([])

    //quest states
    const [questState, setQuestState] = useState([]) //player quest list
    const [selectedQuest, setSelectedQuest] = useState() //current selected quest
    const [selectedQuestReqs, setSelectedQuestReqs] = useState([]) //selected quest requirements for tracking

    // console.log('>>> [Page render] Logging latestFish state', latestFish)
    // console.log('>>> [Page render] Logging loggedEvents array', loggedEvents)
    // console.log('>>> [Page render] Logging inventory state', inventoryState)
    // console.log('>>> [Page render] Logging quest state', questState)
    // console.log('>>> [Page render] Logging selected quest state', selectedQuest)
    // console.log('>>> [Page render] Logging selected quest reqs state', selectedQuestReqs)
    // console.log('>>> [Page render] Logging Release Event Log', releaseLog)

    /* Modal States */
    const [showMap, setShowMap] = useState(false);
    const [showCatch, setShowCatch] = useState(false)
    const [showQuests, setShowQuests] = useState(false)

    /* Functions */ //TODO move all functions to own modules
    async function handleCastClick (playerUid) {
        // console.log('>>> [1] initialising handleCastClick & starting getFish fetch')
        const response = await fetch(`${apiPath()}/getFish/${playerUid}`)
        const newFish = await response.json()
        console.log('>>> Logging response from server', newFish)
        // console.log('>>> [2] setting states for loggedEvents and latestFish')
        // setLoggedEvents(current => [...current, newFish])

        if (newFish.hasOwnProperty('failedStrike')) {
            console.log ('!!! No Strike !!!')
            handleFailedStrike(newFish)

        } else if (newFish.hasOwnProperty('failedFight')) {
            console.log('!!! Failed fight !!!')
            handleFailedFight(newFish)

        } else {
            console.log('^^^ Successful catch ^^^')
            handleCatchLog(newFish)
            setLatestFish(newFish)
            setShowCatch(true)
            setTrigger(current => [...current, 1])
        }
    }

    function handleReleaseLog (fishDetails) {
        const releaseText = `#release# You decide to instead release the ${fishDetails.caught_weight_lbs}lb ${fishDetails.caught_name}`
        setReleaseLog(current => [...current, releaseText])
    }

    function handleFailedFight (fishDetails) {
        const failedFightText = `#failed catch# unfortunately after an epic struggle trying to reel it in, the fish pulled away hard and broke off your line. You guess it must have weighed about ${fishDetails.weight} lbs`
        setReleaseLog(current => [...current, failedFightText])
    }

    function handleFailedStrike (fishDetails) {
        const noStrikeText = `#failed catch# your luck must be lacking, you cast but unfortunately not even a nibble`
        setReleaseLog(current => [...current, noStrikeText])
    }

    function handleCatchLog (fishDetails) {
        const catchText = [
            '#cast# you caught ',
            fishDetails.caught_quality.charAt(0) === 'U' || fishDetails.caught_quality.charAt(0) === 'E' ? 'an ' : 'a ',
            <span key={new Date().getTime() + 1} className={renderQualityColour(fishDetails.caught_quality)}>{fishDetails.caught_quality}</span>,
            ' ',
            <span key={new Date().getTime()} className={styles.caughtFishText}>{fishDetails.caught_name}</span>,
            ' ',
            'weighing ',
            fishDetails.caught_weight_lbs,
            'lbs'
        ]

        setReleaseLog(current => [...current, catchText])
    }

    async function handlePickLocation (playerUid, newLocationName) {
        console.log('>>> Initiating location change')
        console.log('>>> with playerUid: ', playerUid, '>>> with newLocationName: ', newLocationName)
        const reqOptions = {
            method: 'PUT'
        };
        const response = await fetch(`${apiPath()}/locationUpdate/${playerUid}?newLocationName=${newLocationName}`, reqOptions)
        const message = await response.json() //TODO update the environment location using the response, not player data?

        await getPlayerData(playerUid) //fetches the latest player state for updated location
    }

    function pickQuest (userUid, questData) {
        console.log('>>> Logging questData: ', questData)
        setSelectedQuest(questData)
        getPlayerQuestReqs(userUid,questData.quest_id);
    }

    /* Data Fetches */
    async function getPlayerData(userUid) {
        const response = await fetch(`${apiPath()}/getPlayerData/${userUid}`)
        const newState = await response.json();
        setPlayerState(newState)
    }

    async function getUnlockedLocations(userUid) {
        const response = await fetch(`${apiPath()}/getPlayerUnlockedLocations/${userUid}`)
        const newState = await response.json();
        setUnblockedLocations(newState)
    }

    async function getInventory(userUid) {
        const response = await fetch(`${apiPath()}/getPlayerInventory/${userUid}`);
        const newState = await response.json();
        setInventoryState(newState);
    }

    async function getQuestUpdate(userUid) {
        const response = await fetch(`${apiPath()}/getQuests/${userUid}`);
        const newState = await response.json();
        setQuestState(newState);
    }

    async function getPlayerQuestReqs (playerUid, questId) {
        const response = await fetch(`${apiPath()}/getPlayerQuestReqs/${playerUid}/${questId}`);
        const newState = await response.json();
        setSelectedQuestReqs(newState)
    }

    /* useEffects */
    useEffect(() => {
        getPlayerData(user.uid)
        getInventory(user.uid);
        getQuestUpdate(user.uid)
        if (selectedQuest) { //if a quest is selected, fetch the latest quest reqs state
            getPlayerQuestReqs(user.uid, selectedQuest.quest_id)
        }
    }, [latestFish]);

    useEffect(() => { //for on load only fetches
        getUnlockedLocations(user.uid)
    }, [])

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
                    {/*<button>Player</button>*/}
                    {/*<button>Inventory</button>*/}
                    {/*<button>Shop</button>*/}
                    <button onClick={() => setShowQuests(true)}>Quests</button>
                    {/*<button>Achievements</button>*/}
                    {/*<button>Stats</button>*/}
                    {/*<button>Guide</button>*/}
                </section>
                <LoadoutBar className={styles.loadoutBar} inventory={inventoryState}  />
                {/* ----- Game Grid Start ----- */}
                <section className={styles.gameGrid}>
                    <button className={styles.castButton} onClick={() => handleCastClick(user.uid)}>Cast</button>
                    <Log catchEvent={loggedEvents}
                         releaseEvent={releaseLog}
                    />
                    <Environment
                        currentEnvironment={playerState}
                    />
                    <MapModal show={showMap}
                              playerUid={playerState}
                              unlockedLocations={unlockedLocations}
                              changeLocation={(playerUid, newLocation) => handlePickLocation(playerUid, newLocation)}
                              onClose={() => setShowMap(false)}
                    />
                    <QuestsModal show={showQuests}
                                 currentQuests={questState}
                                 onClose={() => setShowQuests(false)}
                                 forceUpdate={trigger}
                                 pickQuest={(userUid, questData) => pickQuest(userUid, questData)}
                                 selectedQuest={selectedQuest}
                                 selectedQuestReqs={selectedQuestReqs}
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

//TODO reduce the number of props on each component, e.g passing player UID down, do it through one prop, not adding extra props