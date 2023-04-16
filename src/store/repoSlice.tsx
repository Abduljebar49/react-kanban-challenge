import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRepository } from "../models/repository";
import { IIssue } from "../models/Issue";
import { updateDoneStorage, updateInprogressStorage, updateRepositoryStorage, updateTodoStorage } from "../storage/localstorage";

export type RepoState = {
  repository: IRepository;
  todo: IIssue[];
  inProgress: IIssue[];
  done: IIssue[];
};

export const initialState: RepoState = {
  repository: {
    id: 0,
    url: "",
    html_url: "",
    name: "",
    full_name:"",
    owner: {
      id: 0,
      url: "",
      html_url: "",
      avatar_url: "",
      name: "",
      login: "",
      type: "",
    },
  },
  done: [],
  todo: [],
  inProgress: [],
};

const repoSlice = createSlice({
  name: "repo",
  initialState: initialState,
  reducers: {
    addRepository: (state: RepoState, action: PayloadAction<IRepository>) => {
      state.repository = action.payload;
      updateRepositoryStorage(state.repository);
    },
    removeRepository: (
      state: RepoState,
      action: PayloadAction<IRepository>
    ) => {
      state.repository = initialState.repository;
      updateRepositoryStorage(state.repository);
    },
    addDone: (state: RepoState, action: PayloadAction<IIssue>) => {
      state.done.push(action.payload);
      updateDoneStorage(state.done);
    },
    removeDone: (state: RepoState, action: PayloadAction<IIssue>) => {
      state.done = state.done.filter((ele) => ele.id !== action.payload.id);
      updateDoneStorage(state.done);
    },
    loadAllToDone: (state: RepoState, action: PayloadAction<IIssue[]>) => {
      state.done = action.payload;
      updateDoneStorage(state.done);
    },
    addInProgres: (state: RepoState, action: PayloadAction<IIssue>) => {
      state.inProgress.push(action.payload);
      updateInprogressStorage(state.inProgress);
    },
    removeInProgres: (state: RepoState, action: PayloadAction<IIssue>) => {
      state.inProgress = state.inProgress.filter(
        (ele) => ele.id !== action.payload.id
      );
      updateInprogressStorage(state.inProgress);
    },
    loadAllToInProgres: (state: RepoState, action: PayloadAction<IIssue[]>) => {
      state.inProgress = action.payload;
      updateInprogressStorage(state.inProgress);

    },
    addTodo: (state: RepoState, action: PayloadAction<IIssue>) => {
      state.todo.push(action.payload);
      updateTodoStorage(state.todo);
    },
    removeTodo: (state: RepoState, action: PayloadAction<IIssue>) => {
      state.todo = state.todo.filter((ele) => ele.id !== action.payload.id);
      updateTodoStorage(state.todo);
    },
    loadAllToTodo: (state: RepoState, action: PayloadAction<IIssue[]>) => {
      state.todo = action.payload;
      updateTodoStorage(state.todo);
    },
  },
});

export default repoSlice.reducer;
export const {
  addRepository,
  removeRepository,
  addTodo,
  removeTodo,
  addInProgres,
  removeInProgres,
  loadAllToInProgres,
  addDone,
  removeDone,
  loadAllToDone,
  loadAllToTodo
} = repoSlice.actions;
