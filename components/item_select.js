import styles from '../styles/item_select.module.css'
import {useEffect, useState} from "react";
import Image from 'next/image'
import {apiPath} from "../pages/dashboard";
import {useAuth} from "../context/authContext";


export const ItemSelect = (props) => {

    const { user } = useAuth()

    if (!props.show) {
        return null
    }

    const itemUpdate = async (playerUid,itemId,itemType) => {
        const requestOptions = {
            method: 'PUT',
        };
        const response = await fetch(`${apiPath()}/itemUpdate/${playerUid}?itemId=${itemId}&itemType=${itemType}`, requestOptions)
        const message = await response.json() //TODO update to try-catch
        await props.trigger()
        props.onClose()

    }

    return (
        <div className={styles.itemSelectContainer} onClick={props.onClose}>
            <section className={styles.itemSelectContent} onClick={event => event.stopPropagation()}>
                <div className={styles.currentEquipped}>
                    {props.currentItem.item_imgsrc &&
                        <Image
                        src={props.currentItem.item_imgsrc}
                        alt='test'
                        width={55}
                        height={55}
                        layout="intrinsic"
                        unoptimized={true}
                        />
                    }
                </div>
                <section className={styles.inventoryOptions}>
                    {props.inventoryOptions.map(item => { //iterates through each inventory option to render it
                        //Below IF renders inventory options for the specific slot only & ignoring current equipped
                        if (props.itemType === item.item_type && item.item_id !== props.currentItem.id) {
                            return (
                                <button key={item.id}
                                        onClick={() => itemUpdate(user.uid, item.item_id, item.item_type)}
                                >
                                    <div key={item.id} className={styles.inventoryItem}>
                                        <Image
                                            src={item ? item.item_imgsrc : '/loading.png'}
                                            alt='test'
                                            width={55}
                                            height={55}
                                            layout="intrinsic"
                                            unoptimized={true}
                                        />
                                    </div>
                                </button>
                            )
                        }
                    })}
                </section>
                <button onClick={props.onClose}>close</button>
            </section>
        </div>
    )
}