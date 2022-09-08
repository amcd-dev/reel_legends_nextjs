import styles from '../styles/loadout_bar.module.css'
import Image from 'next/image'
import {useEffect, useState} from "react";
import {ItemSelect} from "./item_select";
import {apiPath} from "../pages";

export const LoadoutBar = (props) => {

    const [loadout, setLoadout] = useState([])
    //Modals
    const [showBar, setShowBar] = useState(true)
    const [showRod, setShowRod] = useState(false)
    const [showReel, setShowReel] = useState(false)
    const [showHook, setShowHook] = useState(false)
    const [showBait, setShowBait] = useState(false)
    const [showSpecial, setShowSpecial] = useState(false)
    const [showStorage, setShowStorage] = useState(false)
    const [showBoat, setShowBoat] = useState(false)

    async function getPlayerLoadoutExpanded() {
        // console.log('>>> [1] initialising getPlayerLoadout and starting loadout fetch')
        const response = await fetch(`${apiPath()}/getLoadoutStateExpanded`) //TODO make dynamic for '1' to ID
        const newState = await response.json()
        // console.log('>>> [2] setting states for playerLoadout')
        setLoadout(newState)
    }

    useEffect(() => { //First load fetches
        getPlayerLoadoutExpanded()
    }, [])

    return (
        <div className={styles.loadoutContainer}>
            { showBar &&
                <div className={styles.slotContainer}>
                    {/*TODO turn the below into an array map to render all?*/}
                    <div className={styles.slot}>
                        <h4 className={styles.slotName}>Rod</h4>
                        <div className={styles.itemButton} onClick={() => setShowRod(true)}>
                            <Image
                            src={loadout[0] ? loadout[0].item_imgsrc : '/loading.png'} /* If object hasn't loaded, show default image */
                            alt='test'
                            width={55}
                            height={55}
                            layout="intrinsic"
                            unoptimized={true}
                            className={styles.itemSelect}
                            />
                        </div>
                        {loadout[0] && <h4 className={styles.itemName}>{loadout[0].item_name}</h4>} {/* If object index does not exist, don't load yet (preventing react error) */}
                    </div>
                    <div className={styles.slot}>
                        <h4>Reel</h4>
                        <div className={styles.itemButton} onClick={() => setShowReel(true)}>
                            <Image
                            src={loadout[1] ? loadout[1].item_imgsrc : '/loading.png'}
                            alt='test'
                            width={55}
                            height={55}
                            layout="intrinsic"
                            unoptimized={true}
                            className={styles.itemSelect}
                            />
                        </div>
                        {loadout[1] && <h4 className={styles.itemName}>{loadout[1].item_name}</h4>}
                    </div>
                    <div className={styles.slot}>
                        <h4>Hook</h4>
                        <div className={styles.itemButton} onClick={() => setShowHook(true)}>
                            <Image
                                src={loadout[2] ? loadout[2].item_imgsrc : '/loading.png'}
                                alt='test'
                                width={55}
                                height={55}
                                layout="intrinsic"
                                unoptimized={true}
                                className={styles.itemSelect}
                            />
                        </div>
                        {loadout[2] && <h4 className={styles.itemName}>{loadout[2].item_name}</h4>}
                    </div>
                    <div className={styles.slot} onClick={() => setShowBait(true)}>
                        <h4>Bait</h4>
                        <div className={styles.itemButton}>
                            <Image
                                src={loadout[3] ? loadout[3].item_imgsrc : '/loading.png'}
                                alt='test'
                                width={55}
                                height={55}
                                layout="intrinsic"
                                unoptimized={true}
                                className={styles.itemSelect}
                            />
                        </div>
                        {loadout[3] && <h4 className={styles.itemName}>{loadout[3].item_name}</h4>}
                    </div>
                    <div className={styles.slot} onClick={() => setShowSpecial(true)}>
                        <h4>Special</h4>
                        <div className={styles.itemButton}>
                            <Image
                                src={loadout[4] ? loadout[4].item_imgsrc : '/loading.png'}
                                alt='test'
                                width={55}
                                height={55}
                                layout="intrinsic"
                                unoptimized={true}
                                className={styles.itemSelect}
                            />
                        </div>
                        {loadout[4] && <h4 className={styles.itemName}>{loadout[4].item_name}</h4>}
                    </div>
                    <div className={styles.slot} onClick={() => setShowStorage(true)}>
                        <h4>Storage</h4>
                        <div className={styles.itemButton}>
                            <Image
                                src={loadout[5] ? loadout[5].item_imgsrc : '/loading.png'}
                                alt='test'
                                width={55}
                                height={55}
                                layout="intrinsic"
                                unoptimized={true}
                                className={styles.itemSelect}
                            />
                        </div>
                        {loadout[5] && <h4 className={styles.itemName}>{loadout[5].item_name}</h4>}
                    </div>
                    <div className={styles.slot} onClick={() => setShowBoat(true)}>
                        <h4>Boat</h4>
                        <div className={styles.itemButton}>
                            <Image
                                src={loadout[6] ? loadout[6].item_imgsrc : '/loading.png'}
                                alt='test'
                                width={55}
                                height={55}
                                layout="intrinsic"
                                unoptimized={true}
                                className={styles.itemSelect}
                            />
                        </div>
                        {loadout[6] && <h4 className={styles.itemName}>{loadout[6].item_name}</h4>}
                    </div>
                </div>
            }
            <div className={styles.buttonContainer}>
                <button>*</button>
                <button onClick={() => setShowBar(showBar ? false : true)}>Open / Close</button>
                <button>?</button>
            </div>
            <ItemSelect show={showRod} itemType={'rod'} currentItem={loadout[0]} inventoryOptions={props.inventory} trigger={() => {getPlayerLoadoutExpanded()}} onClose={() => setShowRod(false)}/>
            <ItemSelect show={showReel} itemType={'reel'} currentItem={loadout[1]} inventoryOptions={props.inventory} trigger={() => {getPlayerLoadoutExpanded()}} onClose={() => setShowReel(false)}/>
            <ItemSelect show={showHook} itemType={'hook'} currentItem={loadout[2]} inventoryOptions={props.inventory} trigger={() => {getPlayerLoadoutExpanded()}} onClose={() => setShowHook(false)}/>
            <ItemSelect show={showBait} itemType={'bait'} currentItem={loadout[3]} inventoryOptions={props.inventory} trigger={() => {getPlayerLoadoutExpanded()}} onClose={() => setShowBait(false)}/>
            <ItemSelect show={showSpecial} itemType={'special'} currentItem={loadout[4]} inventoryOptions={props.inventory} trigger={() => {getPlayerLoadoutExpanded()}} onClose={() => setShowSpecial(false)}/>
            <ItemSelect show={showStorage} itemType={'storage'} currentItem={loadout[5]} inventoryOptions={props.inventory} trigger={() => {getPlayerLoadoutExpanded()}} onClose={() => setShowStorage(false)}/>
            <ItemSelect show={showBoat} itemType={'boat'} currentItem={loadout[6]} inventoryOptions={props.inventory} trigger={() => {getPlayerLoadoutExpanded()}} onClose={() => setShowBoat(false)}/>

        </div>
    )
}