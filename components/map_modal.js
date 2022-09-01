
    import styles from '../styles/map_modal.module.css'

export const MapModal = (props) => {
    if (!props.show) {
        return null
    }

    return (
        <div>
            <section className={styles.mapModalContainer} onClick={props.onClose}>
                <div className={styles.mapModalContent} onClick={event => event.stopPropagation()}>
                    <div>
                       <p>side Nav</p>
                    </div>
                    <div>
                        <p>Map</p>
                    </div>
                    <button onClick={props.onClose}>X</button>
                </div>
            </section>
        </div>
    )
}