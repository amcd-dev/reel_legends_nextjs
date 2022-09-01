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
                {props.catchEvent.map(fish => {
                    return (
                        <li key={fish.id}>
                            {'#cast# You caught '}
                            {fish.caught_quality.charAt(0) === 'U' || fish.caught_quality.charAt(0) === 'E' ? 'an ' : 'a '}
                            <span className={renderQualityColour(fish.caught_quality)}> {fish.caught_quality} </span>
                            [{fish.caught_name}]{' weighing '}
                            {fish.caught_weight_lbs}{'lbs'}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}