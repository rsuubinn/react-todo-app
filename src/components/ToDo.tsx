import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, IToDo, toDoState } from "../atoms";
import RemoveIcon from "@mui/icons-material/Remove";

const ToDoList = styled.li`
  color: ${(props) => props.theme.textColor};
  list-style: none;
  border-bottom: 1px solid rgba(78, 78, 78, 0.5);
  padding: 10px 0px;
  margin: 10px 0px;
  display: flex;
  align-items: center;
  button {
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    background: transparent;
    outline: none;
    border: none;
    border-radius: 10px;
    padding: 3px 5px;
    &:hover {
      background-color: ${(props) => props.theme.categoryBgColor};
    }
  }
  .deleteBtn {
    margin-right: 10px;
    svg {
      margin-right: 5px;
      padding: 5px;
      font-size: 20px;
      border: 1px solid ${(props) => props.theme.textColor};
      border-radius: 100%;
    }
    &:hover {
      background: none;
    }
  }
`;

const ToDoText = styled.span`
  margin-right: 50px;
`;

function ToDo({ text, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const category = useRecoilValue(categoryState);
  const onChangeCategory = (selectedCategory: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: selectedCategory };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };
  return (
    <ToDoList>
      <button className="deleteBtn" onClick={onDelete}>
        <RemoveIcon />
      </button>
      <ToDoText>{text}</ToDoText>
      {categories.map(
        (useableCategory) =>
          useableCategory !== category && (
            <button
              onClick={() => onChangeCategory(useableCategory)}
              disabled={useableCategory === category}
            >
              {useableCategory}
            </button>
          )
      )}
    </ToDoList>
  );
}

export default ToDo;
