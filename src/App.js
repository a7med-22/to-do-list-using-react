import "./App.css";
import ToDoList from "./myComponents/ToDoList";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./contexts/ToastContext";
import ToDoProvider from "./contexts/toDoContext";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToDoProvider>
        <ToastProvider>
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
            <ToDoList />
          </div>
        </ToastProvider>
      </ToDoProvider>
    </ThemeProvider>
  );
}

export default App;
