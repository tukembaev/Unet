// ChatHeader.js
import React from "react";
import { Avatar, List, ListItem, ListItemAvatar, Typography } from "@mui/material";

function ChatHeader({ selectedEmpl }) {
  return (
    <div className={styles.right_header}>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        <ListItem alignItems="center">
          <ArrowBackIcon className={styles.backBtn} />
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={selectedEmpl[0]?.image} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography sx={{ display: "inline", marginTop: "10px" }} component="span" variant="body2" color="text.primary">
                  <p className={styles.employee_name}>{selectedEmpl[0]?.employee_name}</p>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      {/* Other header content */}
    </div>
  );
}

export default ChatHeader;