import styles from '../styles/environment.module.css'
import Image from 'next/image'

export const Environment = (props) => {
    // console.log('>>> current loc', props.currentEnvironment.current_location)
    return (
        <div className={styles.environmentContainer}>
            <Image
                src={`/${props.currentEnvironment.current_location}.webp`}
                alt='Starting island'
                width={1200}
                height={800}
                layout='responsive'
                // objectFit={'scale-down'}
                unoptimized={true}
            />
        </div>
    );
}