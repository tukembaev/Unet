import React, { useEffect, useState } from "react";
import styles from "./AcademYears.module.scss";
import { useDispatch } from "react-redux";

function AcademYears(formattedArray) {
  const [year] = useState(2023);
  const [startMonth] = useState(7);
  const [startDate] = useState(21);
  const [endMonth] = useState(7);
  const [endDate] = useState(19);
  const [highlightedDays] = useState([]);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  const [ranges, setRanges] = useState();
  useEffect(() => {
    setRanges(formattedArray?.calendarEvents?.map((item) => item));
  }, [render, formattedArray]);

  const isWeekend = (dayOfWeek) => dayOfWeek === 0 || dayOfWeek === 6;

  const isInRange = (date, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date(date);

    return currentDate >= startDate && currentDate <= endDate;
  };

  const renderCalendar = () => {
    const calendar = [];

    let currentMonth = startMonth;
    let currentDay = startDate;
    let currentYear = year;

    while (!(currentMonth === endMonth && currentDay === endDate)) {
      const dayOfWeek = new Date(
        currentYear,
        currentMonth,
        currentDay
      ).getDay();
      const weekend = isWeekend(dayOfWeek);

      calendar.push(
        <div
          key={`${currentMonth}-${currentDay}`}
          className={`${styles.day} ${weekend ? styles.weekend : ""} ${
            highlightedDays.includes(
              `${currentYear}-${currentMonth + 1}-${currentDay}`
            )
              ? styles.highlightedDay
              : ""
          }`}
          titleEvent={ranges?.reduce((title, range) => {
            if (
              isInRange(
                `${currentYear}-${currentMonth + 1}-${currentDay}`,
                range.start,
                range.end
              )
            ) {
              return `${range.title}  `; // Use the title from the range object
            }
            return title;
          }, "")}
          style={{
            backgroundColor: ranges?.reduce((color, range) => {
              if (
                isInRange(
                  `${currentYear}-${currentMonth + 1}-${currentDay}`,
                  range.start,
                  range.end
                )
              ) {
                return range.color; // Используйте цвет из вашего объекта диапазона
              }
              return color;
            }, "transparent"),

            padding: "25px",
            border: "1px solid rgb(128 128 128 / 18%)",
          }}
        >
          {currentDay}
        </div>
      );

      currentDay += 1;

      if (currentDay > daysInMonth(currentMonth, currentYear)) {
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) {
          currentYear += 1;
        }
        currentDay = 1;
      }
    }

    return calendar;
  };

  const daysInMonth = (month, year) => {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return daysInMonth[month];
    } else {
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return daysInMonth[month];
    }
  };
  return (
    <div style={{ paddingBottom: "60px" }}>
      <h1 style={{ marginBottom: "50px", width: "100%", textAlign: "center" }}>
        Академический календарь {year}/{year + 1} год
      </h1>
      <div style={{ display: "flex" , overflowX:'auto' }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <h3
              style={{
                width: "50px",
                height: "250px",
                writingMode: "vertical-rl",
                transform: "scale(-1)",
              }}
            >
              Осенний семестр
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                marginTop: "50px",
              }}
            >
              <h6 style={{width: '100px'}}>Август-Сентябрь</h6>
              <h6 style={{width: '100px'}}>Сентябрь- Октябрь</h6>
              <h6 style={{width: '100px'}}>Октябрь- Ноябрь</h6>
              <h6 style={{width: '100px'}}>Ноябрь- Декабрь</h6>
              <h6 style={{width: '100px'}}>Декабрь-Январь</h6>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <h3
              style={{
                width: "50px",
                height: "200px",
                writingMode: "vertical-rl",
                transform: "scale(-1)",
              }}
            >
              Весенний семестр
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                marginTop: "10px",
              }}
            >
              <h6 style={{width: '100px',marginTop: "20px" }}>Январь- Февраль</h6>
              <h6 style={{width: '100px'}}>Февраль- Март</h6>
              <h6 style={{width: '100px'}}>Март</h6>
              <h6 style={{width: '100px'}}>Апрель</h6>
              <h6 style={{width: '100px'}}>Апрель-Май</h6>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <h3
              style={{
                width: "50px",
                height: "150px",
                writingMode: "vertical-rl",
                transform: "scale(-1)",
              }}
            >
              Летний семестр
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                marginTop: "35px",
              }}
            >
              <h6 style={{width: '100px'}}>Май-Июнь</h6>
              <h6 style={{width: '100px'}}>Июнь-Июль</h6>
              <h6 style={{width: '100px'}}>Июль-Август</h6>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "1400px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginLeft: "30px" }}>
              <h4>Четные недели (ЗНАМЕНАТЕЛЬ)</h4>
              <div
                style={{ display: "flex", gap: " 33px", marginLeft: "15px" }}
              >
                <h5>ПН</h5>
                <h5>ВТ</h5>
                <h5>СР</h5>
                <h5>ЧТ</h5>
                <h5>ПТ</h5>
                <h5>СБ</h5>
                <h5>ВС</h5>
              </div>
            </div>
            <div style={{ marginLeft: "30px" }}>
              <h4>Нечетные недели (ЧИСЛИТЕЛЬ)</h4>
              <div style={{ display: "flex", gap: " 33px" }}>
                <h5>ПН</h5>
                <h5>ВТ</h5>
                <h5>СР</h5>
                <h5>ЧТ</h5>
                <h5>ПТ</h5>
                <h5>СБ</h5>
                <h5>ВС</h5>
              </div>
            </div>
            <div style={{ marginLeft: "30px" }}>
              <h4>Четные недели (ЗНАМЕНАТЕЛЬ)</h4>
              <div style={{ display: "flex", gap: " 33px" }}>
                <h5>ПН</h5>
                <h5>ВТ</h5>
                <h5>СР</h5>
                <h5>ЧТ</h5>
                <h5>ПТ</h5>
                <h5>СБ</h5>
                <h5>ВС</h5>
              </div>
            </div>
            <div style={{ marginLeft: "30px" }}>
              <h4>Нечетные недели (ЧИСЛИТЕЛЬ)</h4>
              <div style={{ display: "flex", gap: " 33px" }}>
                <h5>ПН</h5>
                <h5>ВТ</h5>
                <h5>СР</h5>
                <h5>ЧТ</h5>
                <h5>ПТ</h5>
                <h5>СБ</h5>
                <h5>ВС</h5>
              </div>
            </div>
          </div>
          <div style={{ width: "1400px", display: "flex", flexWrap: "wrap" }}>
            {renderCalendar().map((item, index) => (
              <div
                className={styles.titleOfEvent}
                style={{
                  width: "20px",
                  marginLeft: "30px",
                  height: "50px",
                  marginBottom: "2px",
                  
                }}
                title={
                  item.props.titleEvent === "" ? null : item.props.titleEvent
                }
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademYears;
