import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, watch } = useForm();
  console.log(register("toDo"));
  return (
    <div>
      <form>
        <input {...register} placeholder="오늘의 할일"></input>
        <button>추가하기</button>
      </form>
    </div>
  );
}

export default ToDoList;
