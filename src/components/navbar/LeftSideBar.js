import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
export default function LeftSideBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { category } = useSelector((state) => state.categoryCollection);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {category?.map((item, index) => (
          <ListItem key={item.title}>
            <Link
              to={`/category/${item.slug}/${item._id}`}
              className="nav-link w-100"
            >
              <ListItemButton>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
            <ListItemIcon>
              {anchor === "left" ? <FaGreaterThan /> : <BiUpArrowAlt />}
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <button
          onClick={toggleDrawer("left", true)}
          className="option-cat-left"
        >
          <RxHamburgerMenu />
        </button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
