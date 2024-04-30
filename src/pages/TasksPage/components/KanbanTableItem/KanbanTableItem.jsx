import React, { useState } from "react";
import styles from "./KanbanTableItem.module.scss";
import cx from "classnames";
import TaskItem from "../TaskItem/TaskItem";

function KanbanTableItem({ termTitle, term, taskCount , termTasks1 , isSubtasks}) {

  const [loadMore, setLoadMore] = useState({
    currentTaskState:3,
  })

//  const imagePerRow = 4;
// export const ImageGallery = ({ termTasks1 }) => {
//   const [next, setNext] = useState(imagePerRow);
// const handleMoreImage = () => {
//     setNext(next + imagePerRow);
//   };

   let renderTask = termTasks1?.slice(0, loadMore.currentTaskState)
  
  return ( 
    <div className={styles.wrapper}>
      <div
        className={cx(
          styles.termTitle,
          term == "overdue"
            ? styles.overdue
            : term == "today"
            ? styles.today
            : term == "week"
            ? styles.week
            : term == "mounth"
            ? styles.mounth
            : term == "longrange"
            ? styles.longrange
            : term == "noDeadline"
            ? styles.no__deadline
            : ""
        )}
      >
        {termTitle}
      </div>
      <div
        className={cx(
          styles.termBlock,
          term == "overdue"
            ? styles.overdue__item
            : term == "today"
            ? styles.today__item
            : term == "week"
            ? styles.week__item
            : term == "mounth"?
            styles.mounth__item
            :term == "longrange"?
            styles.longrange__item
            : term == "noDeadline"
            ? styles.no__deadline__item
            : ""
        )}
      >
   

        {
          [...renderTask].map((task) => {
            return <TaskItem task={task} isSubtasks={isSubtasks}/>
          })
        }
        { renderTask.length >= 3 && taskCount !== renderTask.length ? 
        <div className={styles.showMore}>
        <span onClick={() => setLoadMore({currentTaskState: loadMore.currentTaskState + 3})}> Загрузить еще ({taskCount - renderTask.length }) </span> 
        </div> : ''}
      </div>
    </div>
  );
}

export default React.memo(KanbanTableItem);
