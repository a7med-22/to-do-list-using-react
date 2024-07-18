import { createContext } from "react";
import { useReducer } from "react";
import reducer from "../reducers/toDoReducer";
import { useContext } from "react";

export const ToDosContext = createContext([]);
export const dispatchContext = createContext([]);

export default function ToDoProvider({ children }) {
  const [toDos, dispatch] = useReducer(reducer, []);
  return (
    <ToDosContext.Provider value={toDos}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </ToDosContext.Provider>
  );
}

export const useToDo = () => {
  return useContext(ToDosContext);
};
export const useDispatch = () => {
  return useContext(dispatchContext);
};
