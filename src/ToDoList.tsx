import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log("오늘의 할 일", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "할 일을 입력하세요.",
          })}
          placeholder="오늘의 할 일"
        ></input>
        <button>추가하기</button>
      </form>
    </div>
  );
}

export default ToDoList;
