import * as React from "react";

// material mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "../contexts/toDoContext";
// action buttons
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { useToast } from "../contexts/ToastContext";

export default function ToDo({ toDo, showDelete, showUpdate }) {
  // using contexts
  const dispatch = useDispatch();
  const showHideToast = useToast();
  //==== using contexts

  // Event Handlers

  function checkHandler() {
    dispatch({
      type: "toggling checker",
      payload: toDo,
    });
    showHideToast("تم التعديل بنجاح");
  }

  function deleteDialogHandler() {
    showDelete(toDo);
  }

  function updateDialogHandler() {
    showUpdate(toDo);
  }

  //=== Event Handlers
  return (
    <>
      <Card
        className="toDoCard"
        sx={{
          minWidth: 275,
          marginTop: 4,
          backgroundColor: "#283593",
          color: "white",
        }}
      >
        {/* title of task */}
        <Grid container>
          <Grid
            item
            xs={8}
            sx={{
              textAlign: "right",
              textDecoration: toDo.isCompleted ? " line-through " : "none",
            }}
          >
            <CardContent>
              <Typography variant="h5">{toDo.title} </Typography>
              <Typography variant="h6"> {toDo.details}</Typography>
            </CardContent>
          </Grid>
          {/*== title of task ==*/}

          {/* action buttons */}
          <Grid
            xs={4}
            item
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            {/* check icon button */}
            <IconButton
              className="iconButton"
              style={{
                color: toDo.isCompleted ? "white" : "#8bc34a",
                backgroundColor: toDo.isCompleted ? "#8bc34a" : "white",
                border: "solid #8bc34a 3px",
              }}
              onClick={checkHandler}
            >
              <CheckIcon />
            </IconButton>
            {/*== check icon button ==*/}

            <IconButton
              className="iconButton"
              style={{
                color: "#1796aa",
                backgroundColor: "white",
                border: "solid #1796aa 3px",
              }}
              onClick={updateDialogHandler}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              className="iconButton"
              style={{
                color: "#b23c17",
                backgroundColor: "white",
                border: "solid #b23c17 3px",
              }}
              onClick={deleteDialogHandler}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          {/*== action buttons== */}
        </Grid>
      </Card>
    </>
  );
}
