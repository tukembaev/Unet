import React from "react";
import NotificationCard from "./NotificationCard/NotificationCard";
import styles from "./Notification.module.scss";

function Notification() {
  return (
    <div className={styles.notification_wrapper}>
      <div className={styles.notification_heading}>
      <h1>Оповещения</h1>
      </div>
      <div className={styles.notification_body}>
        <NotificationCard />


      </div>





    </div>
  );
}

export default Notification;
