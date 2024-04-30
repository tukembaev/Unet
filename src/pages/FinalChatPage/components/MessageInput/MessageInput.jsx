// MessageList.js
import React from "react";

function MessageList({ messages, loadedMessagesCount, loadMoreMessages }) {
  return (
    <div id="messages" className={styles.messages}>
      {/* Display messages here */}
      <button onClick={loadMoreMessages} className={styles.loadMoreButton}>
        Загрузить еще 10 сообщений
      </button>
    </div>
  );
}

export default MessageList;