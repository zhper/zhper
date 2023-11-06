import React from 'react'
import styles from './style.module.css'
import CategoryContainer from '../CategoryContainer'

export default function CategoryBox() {
    return (
        <div className={styles.mainBox}>
            <h2 className={styles.topTips}>
                zhper's category
            </h2>
            <CategoryContainer />
        </div>
    )
}
