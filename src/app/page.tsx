import styles from './page.module.css'
import UserBox from '@/components/UserBox'
import CategoryBox from '@/components/Category/CategoryBox'
export default function Home() {
  return (
    <div className={styles.container}>
      <UserBox />
      <CategoryBox />
    </div>
  )
}
