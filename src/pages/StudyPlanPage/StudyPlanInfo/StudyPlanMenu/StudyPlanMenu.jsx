import React from 'react'
import styles from './StudyPlanMenu.module.scss'

const StudyPlanMenu = ({title,start_date , end_date }) => {
  return (
    <div className={styles.wrapper}>
    <div className={styles.list__wrapper}>
      <div className={styles.list__item}>
        <p className={styles.list__link} >{title}</p>
      </div>
      <div>
      <div className={styles.list__item}>
        <p className={styles.list__link} >{start_date}-{end_date}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default StudyPlanMenu