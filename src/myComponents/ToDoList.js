import * as React from "react";
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
import { useState } from "react";
import { useContext } from "react";
import { ToDoContext } from "../contexts/toDoContext";
import { v4 as uniqueId } from "uuid";
import { useEffect } from "react";

// import components
import ToDo from "./ToDo";

export default function ToDoList() {
  const { toDos, setToDos } = useContext(ToDoContext);
  const [inputToDo, setInputToDo] = useState("");

  // related to toggle button
  const [buttonToDisplaySpecificTasks, setButtonToDisplaySpecificTasks] =
    useState("all");

  const completedTasks = toDos.filter((task) => task.isCompleted);

  const unCompletedTasks = toDos.filter((task) => !task.isCompleted);

  let renduringSpecificTasks = [];

  if (buttonToDisplaySpecificTasks === "unCompleted") {
    renduringSpecificTasks = unCompletedTasks;
  } else if (buttonToDisplaySpecificTasks === "completed") {
    renduringSpecificTasks = completedTasks;
  } else {
    renduringSpecificTasks = toDos;
  }

  const toDoList = renduringSpecificTasks.map((t) => {
    return <ToDo key={t.id} toDo={t} />;
  });

  //=== related to toggle button

  // Event Handlers
  function renduringTasks(e) {
    setButtonToDisplaySpecificTasks(e.target.value);
  }
  function addClickedHandler() {
    const newToDo = {
      id: uniqueId(),
      title: inputToDo,
      details: "",
      isCompleted: false,
    };
    const updatedToDo = [...toDos, newToDo];
    setToDos(updatedToDo);
    localStorage.setItem("toDos", JSON.stringify(updatedToDo));
    setInputToDo("");
  }

  useEffect(() => {
    console.log("useEffect has been called");
    const localStorageData = JSON.parse(localStorage.getItem("toDos")) ?? [];
    setToDos(localStorageData);
  }, [setToDos]);

  // const localStorageData = JSON.parse(localStorage.getItem("toDos"));
  // setToDos(localStorageData);

  //=== Event Handlers

  return (
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
  );
}
