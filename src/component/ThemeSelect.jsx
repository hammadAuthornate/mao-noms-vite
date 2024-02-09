import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

export default function ThemeSelect() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{ color: theme === "dark" ? "white" : "black" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {theme === "dark" ? <DarkModeIcon /> : <Brightness4Icon />}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setTheme("dark");
            handleClose();
          }}
        >
          <DarkModeIcon /> Dark
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme("light");
            handleClose();
          }}
        >
          <Brightness4Icon /> Light
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTheme("custom");
            handleClose();
          }}
        >
          Custom
        </MenuItem>
      </Menu>
    </div>
  );
}
