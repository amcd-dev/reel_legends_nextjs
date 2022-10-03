import styles from '../styles/quests.module.css'
import {useEffect, useState} from "react";
import {apiPath} from "../pages/dashboard";
import {useAuth} from "../context/authContext";

export const QuestsModal = (props) => {

    const { user } = useAuth()

    if (!props.show) {
        return null
    }

    return (
        <div>
            <section className={styles.questsModalContainer} onClick={props.onClose}>
                <div className={styles.questsModalContent} onClick={event => event.stopPropagation()}>
                    <section className={styles.sideNavContainer}>
                        <h3>Pending</h3>
                        <ul>
                            {props.currentQuests.map((quest, i) => {
                                    if (quest.quest_state === 'unlocked') {
                                        return (
                                            <li key={`unlockedKey_` + i} onClick={() => props.pickQuest(user.uid, quest)}>{quest.quest_title}</li>
                                        )
                                    }
                                }
                            )}
                        </ul>
                        <h3>Completed</h3>
                        <ul>
                            {props.currentQuests.map((quest, i) => {
                                    if (quest.quest_state === 'complete') {
                                        return (
                                            <li key={`unlockedKey_` + i} onClick={() => props.pickQuest(user.uid, quest)}>{quest.quest_title}</li>
                                        )
                                    }
                                }
                            )}
                        </ul>
                    </section>
                    {props.selectedQuest && //only loads this if there is a currently selected quest
                        <section className={styles.mainQuestContent}>
                            <h2>{props.selectedQuest.quest_title}</h2>
                            <p>{props.selectedQuest.quest_desc}</p>
                            <ul className={styles.questReqs}>
                                {props.selectedQuestReqs.map((questRequirement, i) => {
                                    return (
                                        <li key={`questRequirement_` + i}>
                                            {questRequirement.quest_amtcurrent}
                                            /
                                            {questRequirement.quest_amtneeded}
                                            {' '}{questRequirement.quest_fishtype}
                                        </li>
                                    )
                                })}
                            </ul>
                            <ul>
                                <li>Reward #1</li>
                                <li>Reward #2</li>
                            </ul>
                        </section>
                    }
                    <button onClick={props.onClose}>X</button>
                </div>
            </section>
        </div>
    )
}