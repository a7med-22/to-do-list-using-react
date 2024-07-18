import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// Related To Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useToast } from "../contexts/ToastContext";
// import components
import ToDo from "./ToDo";
import { useToDo } from "../contexts/toDoContext";
import { useDispatch } from "../contexts/toDoContext";
// transitions
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//=== transitions

export default function ToDoList() {
  const [inputToDo, setInputToDo] = useState("");
  const [deleteToDoModal, setDeleteToDoModal] = useState(false);
  const [toDoDialog, setToDoDialog] = useState(null);
  const [updateToDoModal, setUpdateToDoModal] = useState(false);
  const [toDoModified, setToDoModified] = useState({
    title: "",
    details: "",
  });
  const showHideToast = useToast();
  const toDos = useToDo();
  const dispatch = useDispatch();

  // related to toggle button
  const [buttonToDisplaySpecificTasks, setButtonToDisplaySpecificTasks] =
    useState("all");

  //must do return for useMemo if don't it will return undefined

  const completedTasks = useMemo(() => {
    return toDos.filter((task) => {
      console.log("calling completed tasks");
      return task.isCompleted;
    });
  }, [toDos]);
  const unCompletedTasks = useMemo(() => {
    return toDos.filter((task) => {
      console.log("calling noncompleted tasks");
      return !task.isCompleted;
    });
  }, [toDos]);

  let renduringSpecificTasks = [];

  if (buttonToDisplaySpecificTasks === "unCompleted") {
    renduringSpecificTasks = unCompletedTasks;
  } else if (buttonToDisplaySpecificTasks === "completed") {
    renduringSpecificTasks = completedTasks;
  } else {
    renduringSpecificTasks = toDos;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);

  //=== related to toggle button

  // Event Handlers
  function renduringTasks(e) {
    setButtonToDisplaySpecificTasks(e.target.value);
  }
  function addClickedHandler() {
    dispatch({ type: "added", payload: { title: inputToDo } });
    setInputToDo("");
    showHideToast("تم الاضافه بنجاح");
  }

  function deleteDialogHandler(toDo) {
    setDeleteToDoModal(true);
    setToDoDialog(toDo);
  }

  function closeDeleteHandler() {
    setDeleteToDoModal(false);
  }

  function confirmDeleteToDoHandler() {
    dispatch({
      type: "deleted",
      payload: toDoDialog,
    });
    setDeleteToDoModal(false);
    showHideToast("تم الحذف بنجاح");
  }

  function updateDialogHandler(toDo) {
    setToDoDialog(toDo);
    setToDoModified({ title: toDo.title, details: toDo.details });
    setUpdateToDoModal(true);
  }

  function closeUpdateHandler() {
    setUpdateToDoModal(false);
  }

  function confirmUpdateHandler() {
    dispatch({
      type: "updated",
      payload: {
        title: toDoModified.title,
        details: toDoModified.details,
        id: toDoDialog.id,
      },
    });
    showHideToast("تم التحديث بنجاح");
    closeUpdateHandler();
  }
  // const localStorageData = JSON.parse(localStorage.getItem("toDos"));
  // setToDos(localStorageData);

  //=== Event Handlers

  const toDoList = renduringSpecificTasks.map((t) => {
    return (
      <ToDo
        key={t.id}
        toDo={t}
        showDelete={deleteDialogHandler}
        showUpdate={updateDialogHandler}
      />
    );
  });

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
          <Button onClick={confirmDeleteToDoHandler}>نعم, قم بالحذف</Button>
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
            value={toDoModified.title}
            required
            margin="dense"
            id="title"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setToDoModified({ ...toDoModified, title: e.target.value });
            }}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            value={toDoModified.details}
            autoFocus
            required
            margin="dense"
            id="details"
            label="التفاصيل"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setToDoModified({ ...toDoModified, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateHandler}>إغلاق</Button>
          <Button onClick={confirmUpdateHandler}>تأكيد</Button>
        </DialogActions>
      </Dialog>

      {/*=== Update Dialog Modal ===*/}
      <Container maxWidth="md">
        <Card
          sx={{
            minWidth: 275,
            padding: 1,
          }}
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />
          </CardContent>

          {/* filter buttons */}
          <ToggleButtonGroup
            style={{ marginTop: "30px", direction: "ltr" }}
            exclusive
            aria-label="Platform"
            value={buttonToDisplaySpecificTasks}
            onChange={renduringTasks}
            color="primary"
          >
            <ToggleButton value={"unCompleted"}>غير منجز</ToggleButton>
            <ToggleButton value={"completed"}>منجز</ToggleButton>
            <ToggleButton value={"all"}>الكل</ToggleButton>
          </ToggleButtonGroup>
          {/*== filter buttons ==*/}

          {/* to do component */}
          {toDoList}
          {/*== to do component ==*/}

          {/* input + add button */}
          <Grid
            container
            spacing={2}
            style={{ marginTop: "50px", marginBottom: "30px" }}
          >
            <Grid item xs={8}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
                value={inputToDo}
                onChange={(e) => setInputToDo(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} display="flex" alignItems="center">
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={addClickedHandler}
                disabled={inputToDo.length === 0}
              >
                إضافه
              </Button>
            </Grid>
          </Grid>
          {/*== input + add button ==*/}
        </Card>
      </Container>
    </>
  );
}
