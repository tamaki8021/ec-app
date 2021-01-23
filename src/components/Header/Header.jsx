import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import { getInSigenedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/img/icons/logo.png";
import { HeaderMenus, ClosableDrawer } from "./index";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
  logo: {
    width: "158px",
    height: 68,
    objectFit: "cover",
    objectPosition: "20% 38%",
  },
});

const Header = () => {
  const classes = useStyles();

  //ログインされているか確認するための処理
  const selector = useSelector((state) => state);
  const isSignedIn = getInSigenedIn(selector);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img
            src={logo}
            alt="codhi- logo"
            className={classes.logo}
            onClick={() => dispatch(push("/"))}
          />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
