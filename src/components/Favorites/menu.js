import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const FavDelete = ({ removeFavorite }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#aaaaaa",
      },
    },
  });
  return (
    <div className="fav-delete">
      <ThemeProvider theme={theme}>
        <Tooltip title="Remove" placement="bottom" classes={"fav-delete-btn"}>
          <IconButton onClick={removeFavorite}>
            <DeleteIcon color="primary" />
          </IconButton>
        </Tooltip>
      </ThemeProvider>
    </div>
  );
};

export default FavDelete;
