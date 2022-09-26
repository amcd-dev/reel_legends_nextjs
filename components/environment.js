import styles from '../styles/environment.module.css'
import Image from 'next/image'
import environmentImage from '../public/locations_art/tumblr_9fdf54b98d337687a47cfc9cb60a60a6_10d3d2ad_640.webp'

export const Environment = (props) => {
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