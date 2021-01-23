import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { TextInput } from "../UIkit/index";
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import {signOut} from '../../reducks/users/operation'

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPeaper: {
    width: 256,
  },
  searchField: {
    alignItems: "conter",
    display: "flex",
    marginLeft: 32,
  },
}));

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const { container } = props;
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value);
    },
    [setKeyword]
  );

  const selectMenu = (event, path) => {
      dispatch(push(path))
      props.onClose(event, false)
  }

  const menus = [
    {func: selectMenu, label: '商品登録', icon: <AddCircleIcon />, id: 'register', value: '/product/edit'},
    {func: selectMenu, label: '注文履歴', icon: <HistoryIcon />, id: 'history', value: '/order/history'},
    {func: selectMenu, label: 'プロフィール', icon: <PersonIcon />, id: 'profile', value: '/user/mypage'}
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e, false)}
        classes={{ paper: classes.drawerPeaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              value={keyword}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={"ログアウト"} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default ClosableDrawer;
