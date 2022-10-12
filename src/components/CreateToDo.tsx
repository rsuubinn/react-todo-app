import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const ToDoInput = styled.input`
  width: 50%;
  font-size: 18px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  background: transparent;
  margin-bottom: 50px;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category },
      ...oldToDos,
    ]);
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <ToDoInput
        {...register("toDo", {
          required: "할 일을 입력하세요.",
        })}
        placeholder="오늘의 할 일"
      ></ToDoInput>
    </form>
  );
}

export default CreateToDo;
