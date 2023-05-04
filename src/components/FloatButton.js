import React from "react";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Chat } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        backgroundColor: "white",
        color: "gray",
        fontSize: "40px",
        width: theme.spacing(8),
        height: theme.spacing(8)
      }
    }));

function FloatButton() {
  const classes = useStyles();

  return (
    <Fab className={classes.fab}>
      <Chat />
    </Fab>
  );
}

export default FloatButton;
