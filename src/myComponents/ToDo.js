import * as React from "react";

// material mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { ToDoContext } from "../contexts/toDoContext";
import Button from "@mui/material/Button";
import { useState } from "react";

// action buttons
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

// Related To Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ToDo({ toDo }) {
  // using states
  const { toDos, setToDos } = useContext(ToDoContext);
  const [deleteToDoModal, setDeleteToDoModal] = useState(false);
  const [updateToDoModal, setUpdateToDoModal] = useState(false);
  const [todDoModified, setToDoModified] = useState({
    title: toDo.title,
    details: toDo.details,
  });

  // Event Handlers

  function checkHandler() {
    const updatedToDo = toDos.map((t) => {
      if (t.id === toDo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setToDos(updatedToDo);
    localStorage.setItem("toDos", JSON.stringify(updatedToDo));
  }

  function deleteDialogHandler() {
    setDeleteToDoModal(true);
  }
  function updateDialogHandler() {
    setUpdateToDoModal(true);
  }

  function closeDeleteHandler() {
    setDeleteToDoModal(false);
  }

  function closeUpdateHandler() {
    setUpdateToDoModal(false);
  }

  function deleteToDoHandler() {
    const updatedToDo = toDos.filter((t) => t.id !== toDo.id);
    setToDos(updatedToDo);
    localStorage.setItem("toDos", JSON.stringify(updatedToDo));
  }

  function confirmUpdateHandler() {
    const updatedToDo = toDos.map((t) => {
      if (t.id === toDo.id) {
        if (todDoModified.title === "" && todDoModified.details === "") {
          return t;
        }
        return {
          ...t,
          title: todDoModified.title,
          details: todDoModified.details,
        };
      } else {
        return t;
      }
    });
    setToDos(updatedToDo);
    localStorage.setItem("toDos", JSON.stringify(updatedToDo));

    closeUpdateHandler();
  }
  //=== Event Handlers
  return (
    <>
      {/*Delete Dialog Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        open={deleteToDoModal}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        onClose={closeDeleteHandler}
      >
        <DialogTitle> هل أنت متأكد من رغبتك في حذف المهمه ؟</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteHandler}>إغلاق</Button>
          <Button onClick={deleteToDoHandler}>نعم, قم بالحذف</Button>
        </DialogActions>
      </Dialog>

      {/*=== Delete Dialog Modal ===*/}

      {/*Update Dialog Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        open={updateToDoModal}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        onClose={closeUpdateHandler}
        maxWidth="sm" // Adjust this value based on your needs
        fullWidth
      >
        <DialogTitle>تعديل المهمه</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={todDoModified.title}
            required
            margin="dense"
            id="title"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setToDoModified({ ...todDoModified, title: e.target.value });
            }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            value={todDoModified.details}
            autoFocus
            required
            margin="dense"
            id="details"
            label="التفاصيل"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setToDoModified({ ...todDoModified, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateHandler}>إغلاق</Button>
          <Button onClick={confirmUpdateHandler}>تأكيد</Button>
        </DialogActions>
      </Dialog>

      {/*=== Update Dialog Modal ===*/}

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
