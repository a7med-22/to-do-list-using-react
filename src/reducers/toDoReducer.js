import { v4 as uniqueId } from "uuid";

export default function reducer(toDosCurrentValue, action) {
  switch (action.type) {
    case "added": {
      const newToDo = {
        id: uniqueId(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const updatedToDo = [...toDosCurrentValue, newToDo];
      localStorage.setItem("toDos", JSON.stringify(updatedToDo));
      return updatedToDo;
    }
    case "deleted": {
      const updatedToDo = toDosCurrentValue.filter(
        (t) => t.id !== action.payload.id
      );
      localStorage.setItem("toDos", JSON.stringify(updatedToDo));
      return updatedToDo;
    }
    case "updated": {
      const updatedToDo = toDosCurrentValue.map((t) => {
        if (t.id === action.payload.id) {
          if (action.payload.title === "" && action.payload.details === "") {
            return t;
          }
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("toDos", JSON.stringify(updatedToDo));
      return updatedToDo;
    }
    case "toggling checker": {
      const updatedToDo = toDosCurrentValue.map((t) => {
        if (t.id === action.payload.id) {
          const updated = { ...t, isCompleted: !t.isCompleted };
          return updated;
        }
        return t;
      });
      localStorage.setItem("toDos", JSON.stringify(updatedToDo));
      return updatedToDo;
    }

    case "get": {
      const localStorageData = JSON.parse(localStorage.getItem("toDos")) ?? [];
      return localStorageData;
    }
    default: {
      throw Error("unknown type " + action.type);
    }
  }
}
