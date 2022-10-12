import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDos",
  storage: localStorage,
});

export const isDarkAtom = atom<boolean>({
  key: "isDark",
  default: JSON.parse(localStorage.getItem("isDark") ?? JSON.stringify(true)),
});

export let defaultCategoreis: string[] = ["해야할 일", "진행중", "완료"];

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const categoryState = atom({
  key: "category",
  default: defaultCategoreis[0],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: JSON.parse(
    localStorage.getItem("categories") ?? JSON.stringify(defaultCategoreis)
  ),
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
