import styles from '../styles/log.module.css'

import {useState} from "react";

export function renderQualityColour(caughtQuality) {
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

    }
}

export const Log = (props) => {
    // console.log('>>> Logging props: ', props)
    // console.log('>>> Logging props.event: ', props.catchEvent)


    return (
        <div className={styles.logContainer}>
            <p>--- Event Log ---</p>
            <ul>
                {props.releaseEvent.map((event, i) => {
                    return (
                        <li key={'releaseId_'+ i}>{event}</li>
                    )
                })}
            </ul>
        </div>
    );
}