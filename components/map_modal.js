import styles from '../styles/map_modal.module.css'
import Image from 'next/image'
import mapImage from "../public/locations_art/basemapexample.jpg"

export const MapModal = (props) => {
    if (!props.show) {
        return null
    }

    /* This for loop makes an array of ??? locations based on how many are unlocked, then used to render the list */
    const lockedRows = [];
    for (let i = 0; i < (6 - props.unlockedLocations.length) ; i++) {
        lockedRows.push('???')
    }

    return (
        <div>
            <section className={styles.mapModalContainer} onClick={props.onClose}>
                <div className={styles.mapModalContent} onClick={event => event.stopPropagation()}>
                    <div className={styles.sideNavContainer}>
                        <h3>Fishing Locations</h3>
                        {props.unlockedLocations &&
                            <ul>
                                {props.unlockedLocations.map((unlockedLocation, i) => {
                                    return (
                                        <li key={`unlockedLocationKey_`+ i}>{unlockedLocation.location_name}</li>
                                    )
                                })}
                            </ul>

                        }
                        {props.unlockedLocations &&
                            <ul>
                                {lockedRows.map((row, i) => {
                                    return (
                                        <li key={`lockedLocationKey_`+ i}>{row}</li>
                                    )
                                })}
                            </ul>
                        }
                    </div>
                    <div>
                        <Image
                            src={mapImage}
                            alt='Starting island'
                            width={900}
                            height={500}
                            layout='intrinsic'
                            // objectFit={'scale-down'}
                            unoptimized={true}
                        />
                    </div>
                    <button onClick={props.onClose}>X</button>
                </div>
            </section>
        </div>
    )
}