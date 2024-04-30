import React, { useState, useEffect } from "react";
import styles from "./BottomSheet.module.scss"; // Импортируйте файл стилей
import close from "./../../assets/icons/close.png";

const BottomSheet = ({ isOpen, onClose, children, width, height, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };

  const sheetStyle = {
    backgroundColor: "white",
    position: "fixed", // Изменил на fixed
    bottom: 0,
    right: 7,
    width: width ? width : "45%",
    height: height ? height : "60%",
    zIndex: 100,
    overflowY: "auto",
    transform: isOpen ? "translateY(0)" : "translateY(100%)",
    transition: "transform 0.5s ease",
    border: "1px solid black",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  };

  return (
    <>
      <div
        className={isOpen ? styles.bottomSheetOpen : styles.bottomSheetClosed}
        style={sheetStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={styles.header}>
          <h5>{title}</h5>
          <img
            src={close}
            onClick={() => onClose(false)}
            className={styles.img}
            alt=""
          />
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </>
  );
};

export default BottomSheet;
