import styles from '../styles/environment.module.css'
import Image from 'next/image'
import environmentImage from '../public/locations_art/Ed8-ay9XkAYQy-0.png'

export const Environment = () => {
    return (
        <div className={styles.environmentContainer}>
            <Image
                src={environmentImage}
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