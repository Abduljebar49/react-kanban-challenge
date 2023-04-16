import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import thunk from "redux-thunk";
import repoSlice from "./repoSlice";



export const rootReducers = combineReducers({
    repo: repoSlice
})
  
export const store = configureStore({
  reducer:repoSlice
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
