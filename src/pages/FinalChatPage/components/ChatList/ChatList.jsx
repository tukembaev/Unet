// ChatList.js
import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

function ChatList({ chats, handleClick }) {
  return (
    <List sx={{ width: "100%", maxWidth: "100%" }}>
      {chats.map((item) => (
        <ListItem
          key={item.id}
          alignItems="center"
          onClick={() => handleClick(item)}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={item?.image} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <p className={styles.employee_name}>{item?.employee_name}</p>
                <p className={styles.employee_name}>{item?.sent_at}</p>
              </div>
            }
            secondary={
              <React.Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  {item?.last_message}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ChatList;