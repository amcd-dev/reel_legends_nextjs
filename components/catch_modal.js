import styles from '../styles/catch_modal.module.css'
import Image from 'next/image'
import {renderQualityColour} from "./log";
import {apiPath} from "../pages";

export const CatchModal = (props) => {
    // console.log('>>> [CatchModal] Logging props.latestCatch', props.latestCatch)
    if (!props.show) {
        return null
    }

    const handleRelease = async (fishId) => {
        console.log('Removing last caught fish from player_aquarium')
        await fetch(`${apiPath()}/releaseFish/${fishId}`,{
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => console.log(data))
        props.onClose()
        props.releaseEvent()
    }

    return (
        <div>
            <section className={styles.catchModalContainer} onClick={props.onClose}>
                <div className={styles.catchModalContent} onClick={event => event.stopPropagation()}>
                    <button onClick={props.onClose}>X</button>
                    <header>
                        <h4 className={
                            `${renderQualityColour(props.latestCatch.caught_quality)} ${styles.rarity}`
                        }>{props.latestCatch.caught_quality}
                        </h4>
                        <h3>{props.latestCatch.caught_name}</h3>
                        <h4>{props.latestCatch.caught_weight_lbs}lbs</h4>
                    </header>
                    <Image
                        src={props.latestCatch.caught_fish_imgsrc}
                        alt='test'
                        width={120}
                        height={120}
                        layout="intrinsic"
                        unoptimized={true}
                    />
                    <button onClick={() => {handleRelease(props.latestCatch.id)}}>Release Fish?</button>
                </div>
            </section>
        </div>
    )
}

// '/yellowfin_bream_common.png'