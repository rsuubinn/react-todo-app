import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("email", {
            required: "이메일은 필수 입력 입니다.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "네이버 이메일만 입력 가능합니다.",
            },
          })}
          placeholder="이메일"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("lastName", {
            required: "성을 입력해주세요.",
          })}
          placeholder="성"
        />
        <span>{errors.lastName?.message}</span>
        <input
          {...register("firstName", {
            required: "이름을 입력해주세요.",
          })}
          placeholder="이름"
        />
        <span>{errors.firstName?.message}</span>
        <input
          {...register("userName", {
            required: "닉네임을 입력해주세요.",
          })}
          placeholder="닉네임"
        />
        <span>{errors.userName?.message}</span>
        <input
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          placeholder="비밀번호"
        />
        <span>{errors.password?.message}</span>
        <input
          {...register("confirmPassword", {
            required: "비밀번호를 입력해주세요.",
          })}
          placeholder="비밀번호 확인"
        />
        <span>{errors.confirmPassword?.message}</span>
        <button>가입하기</button>
      </form>
    </div>
  );
}

export default ToDoList;
