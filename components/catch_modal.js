import styles from '../styles/Catch_modal.module.css'
import Image from 'next/image'
import {renderQualityColour} from "../pages/log";

export const CatchModal = (props) => {
    // console.log('>>> [CatchModal] Logging props.latestCatch', props.latestCatch)
    if (!props.show) {
        return null
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
                    <button>Release Fish?</button>
                </div>
            </section>
        </div>
    )
}

// '/yellowfin_bream_common.png'