import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const CategoryLists = styled.div`
  transition: background-color 0.2s;
  background-color: ${(props) => props.theme.leftBgColor};
  padding: 20px;
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 15px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
    font-size: 24px;
  }
  button {
    color: ${(props) => props.theme.textColor};
    background: transparent;
    padding: 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 16px;
    text-align: start;
  }
  button[disabled] {
    background-color: ${(props) => props.theme.categoryBgColor};
    cursor: default;
  }
  button:last-child {
    margin-top: 50px;
    background: transparent;
    opacity: 0.6;
    & svg {
      background: none;
      border: 1px solid ${(props) => props.theme.textColor};
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    padding: 5px;
    font-size: 25px;
    border-radius: 100%;
    background-color: #f98c07;
    color: white;
  }
`;

const ToDoLists = styled.div`
  transition: background-color 0.2s;
  padding: 20px;
  background-color: ${(props) => props.theme.rightBgColor};
  h3 {
    margin-bottom: 15px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
    font-size: 24px;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const onClick = (useableCategory: string) => {
    setCategory(useableCategory);
  };

  const onAddCategory = () => {
    const newCategory = prompt("새로운 카테고리", "");
    if (newCategory) {
      if (newCategory in categories) {
        alert("이미 같은 카테고리가 존재합니다.");
        return;
      }
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
    }
  };
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  return (
    <Container>
      <Helmet>
        <title>{category}</title>
      </Helmet>
      <CategoryLists>
        <h3>나의 목록</h3>
        {categories.map((useableCategory) => (
          <CategoryButton
            onClick={() => onClick(useableCategory)}
            disabled={useableCategory === category}
          >
            <FormatListBulletedIcon />
            {useableCategory}
          </CategoryButton>
        ))}
        <CategoryButton onClick={onAddCategory}>
          <AddIcon /> 목록 추가
        </CategoryButton>
      </CategoryLists>

      <ToDoLists>
        <h3>{category}</h3>
        <CreateToDo />
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoLists>
    </Container>
  );
}

export default ToDoList;
