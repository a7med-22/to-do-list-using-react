import "./App.css";
import ToDoList from "./myComponents/ToDoList";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { ToDoContext } from "./contexts/toDoContext";
import { useState } from "react";
import { v4 as uniqueId } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#00bfa5",
    },
  },
});

const initialToDos = [
  {
    id: uniqueId(),
    title: "قراءه كتاب",
    details: "يباشسنيﻻهصش",
    isCompleted: false,
  },
];

function App() {
  const [toDos, setToDos] = useState(initialToDos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          direction: "rtl",
          backgroundColor: "#191b1f",
        }}
      >
        <ToDoContext.Provider value={{ toDos, setToDos }}>
          <ToDoList />
        </ToDoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
