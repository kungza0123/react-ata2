// import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import categories from "../data/categories";
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'
import React, { useContext } from 'react'

const useStyles = makeStyles({
  list: {
    width: 200,
    paddingLeft: 10,
    paddingRight: 5
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer({ setCategory }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        <ListItem>Menu</ListItem>
      </List>
      <Divider />
      <List>
        {categories.map((text, index) => (
          <ListItem
            style={{ height: 40, borderRadius: 3 }}
            button
            key={text}
            onClick={() => setCategory(text)}
          >
            <ListItemText primary={text} />
          </ListItem>

        ))}
      </List>
      <List>
        <ListItem onClick={() => firebaseConfig.auth().signOut()} class="btn btn-danger">
          Sign Out
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>
          <MenuIcon />
        </Button>
        <ThemeProvider theme={theme}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("left")}
          </Drawer>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}
