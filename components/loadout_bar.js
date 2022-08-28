import styles from '../styles/loadout_bar.module.css'
import Image from 'next/image'
import {useState} from "react";

export const LoadoutBar = (props) => {
    const [showBar, setShowBar] = useState(true)
    return (
        <div className={styles.loadoutContainer}>
            { showBar &&
                <div className={styles.slotContainer}>
                    <div className={styles.slot}>
                        <h4>Rod</h4>
                        {props.loadout[0].item_imgsrc && /* If loadout state hasn't loaded don't display image. Prevents  React img src Error  */
                            <Image
                            src={props.loadout[0].item_imgsrc}
                            alt='test'
                            width={55}
                            height={55}
                            layout="intrinsic"
                            unoptimized={true}
                            />
                        }
                        <h3>{props.loadout[0].item_name}</h3>
                    </div>
                    <div className={styles.slot}>
                        <h4>Reel</h4>
                        {props.loadout[0].item_imgsrc &&
                            <Image
                            src={props.loadout[1].item_imgsrc}
                            alt='test'
                            width={55}
                            height={55}
                            layout="intrinsic"
                            unoptimized={true}
                            />
                        }
                        <h3>{props.loadout[1].item_name}</h3>
                    </div>
                    <div className={styles.slot}>
                        <h4>Hook</h4>
                        {props.loadout[0].item_imgsrc &&
                            <Image
                                src={props.loadout[2].item_imgsrc}
                                alt='test'
                                width={55}
                                height={55}
                                layout="intrinsic"
                                unoptimized={true}
                            />
                        }
                        <h3>{props.loadout[2].item_name}</h3>
                    </div>
                </div>
            }
            <div className={styles.buttonContainer}>
                <button>*</button>
                <button onClick={() => setShowBar(showBar ? false : true)}>Open / Close</button>
                <button>?</button>
            </div>
        </div>
    )
}