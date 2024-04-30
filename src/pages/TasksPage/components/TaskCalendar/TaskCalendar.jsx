
import React, { useState } from 'react'
import styles from "./TaskCalendar.module.scss"
export default function TaskCalendar() {
  // states
  const [selectedDate , setSelectedDate] = useState(new Date());
  const [todayDate , setTodayDate] = useState(new Date());

  // functions
  const  findMonthDays = (y , m) =>{
    return new Date(y , m + 1 , 0).getDate();
  }

  const findFirstDay = (y , m) =>{
    return new Date(y , m , 1);
  }

  const changeToPrevMonth = () =>{
        setSelectedDate((prevDate) =>{
          const prevMonth = prevDate.getMonth() - 1;
          const prevYear = prevDate.getFullYear();
          return new Date(prevYear , prevMonth); 
        })
  }

  const changeToNextMonth = () =>{
      setSelectedDate((nextDate) =>{
        const nextMonth = nextDate.getMonth() + 1;
        const nextYear = nextDate.getFullYear();
        return new Date(nextYear , nextMonth);
      })
  }

  const handleDateClick = (date) =>{
      setSelectedDate(date)
  }

  const showCalendar = () =>{
    const currentDate = new Date();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const monthDays = findMonthDays(year , month);
    const findDays = findFirstDay(year , month);

    const allDays = [];

    for(let i = 0; i < findDays; i++){
      allDays.push(<div key = {`em-${i}`} className = "box empty"></div>);
      // show real days 

      for(let d = 1; d <= monthDays; d++){
        const date = new Date(year , month , d);
        // const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
        const isToday  = todayDate && date.toDateString() === todayDate.toDateString()
        allDays.push(
          <div key={`d-${d}`} 
          className={isToday ? styles.calendar_today : styles.calendar_child }
          onClick={() => handleDateClick(date)}
          > 
            <p>{d}</p>
          </div>
        )
      }
      
      return allDays;
    }
  }



  return (
    <div className={styles.calendar_wrapper}>
      <div className={styles.calendar_head}>
        <div className={styles.calendar_year}>
          <h3>{selectedDate.toLocaleString("default", { month: "long"})}</h3>
          <p>{selectedDate.toLocaleString("default", { year: "numeric",})}</p>
        </div>
        <div className={styles.calendar_date}>
          <p>{selectedDate.toLocaleDateString()}</p>
        </div>
        <div className={styles.calendar_controls}>
           <button onClick = {changeToPrevMonth}>prev</button>
           <button onClick = {changeToNextMonth}>next</button>
        </div>
      </div>
      <div className={styles.calendar_body}>
        <div className={styles.week_days}>

          <div className={styles.week_day}>
            <p>Вс</p>
          </div>
          <div className={styles.week_day}>
            <p>Пн</p>
          </div>
          <div className={styles.week_day}>
            <p>Вт</p>
          </div>
          <div className={styles.week_day}>
            <p>Ср</p>
          </div>
          <div className={styles.week_day}>
            <p>Чт</p>
          </div>
          <div className={styles.week_day}>
            <p>Пт</p>
          </div>
          <div className={styles.week_day}>
            <p>Сб</p>
          </div>
        </div>
        <div className={styles.calendar_parent}>
          {showCalendar()}
        </div>
      </div>
    </div>
  )
}
