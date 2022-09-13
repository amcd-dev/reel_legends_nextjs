import styles from '../styles/quests.module.css'
import {useEffect, useState} from "react";
import {apiPath} from "../pages";

export const QuestsModal = (props) => {
    const [selectedQuest, setSelectedQuest] = useState({})
    const [selectedQuestReqs, setSelectedQuestReqs] = useState([])

    // console.log('>>> Logging selected Quest state', selectedQuest)
    // console.log('>>> Logging selected Quest Reqs', selectedQuestReqs)

    async function getPlayerQuestReqs (playerId, questId) {
        const response = await fetch(`${apiPath()}/getPlayerQuestReqs/${playerId}/${questId}`); //TODO make dynamic for '1' to ID
        const newState = await response.json();
        setSelectedQuestReqs(newState)
    }

    function pickQuest (questData) {
        setSelectedQuest(questData)
        getPlayerQuestReqs(1,questData.quest_id);
    }

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
                                            <li key={`unlockedKey_` + i} onClick={() => pickQuest(quest)}>{quest.quest_title}</li>
                                        )
                                    }
                                }
                            )}
                        </ul>
                        <h3>Completed</h3>
                        <ul>
                            {props.currentQuests.map((quest, i) => {
                                    if (quest.quest_state === 'completed') {
                                        return (
                                            <li key={`unlockedKey_` + i} onClick={() => pickQuest(quest)}>{quest.quest_title}</li>
                                        )
                                    }
                                }
                            )}
                        </ul>
                    </section>
                    <section className={styles.mainQuestContent}>
                        <h2>{selectedQuest.quest_title}</h2>
                        <p>{selectedQuest.quest_desc}</p>
                        <ul className={styles.questReqs}>
                            {selectedQuestReqs.map((questRequirement, i) => {
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
                        <ul >
                            <li>Reward #1</li>
                            <li>Reward #2</li>
                        </ul>
                    </section>
                    <button onClick={props.onClose}>X</button>
                </div>
            </section>
        </div>
    )
}