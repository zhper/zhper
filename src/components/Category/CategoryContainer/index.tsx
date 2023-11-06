import React from 'react'
import styles from './style.module.css'
import CategoryItem from '../CategoryItem'
export default function CategoryContainer() {
    return (
        <div className={styles.noteContainer}>
            <CategoryItem />
        </div>
    )
}
