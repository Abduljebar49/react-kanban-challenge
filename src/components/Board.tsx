import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { Layout } from "antd";
import Search from "antd/es/input/Search";
import { IRepository } from "../models/repository";
import { IIssue } from "../models/Issue";
import { useAppDispatch, useAppSelector } from "../store/store";
import "../styles/column.css";

import {
  addRepository,
  addTodo,
  removeTodo,
  addInProgres,
  removeInProgres,
  loadAllToInProgres,
  addDone,
  removeDone,
  loadAllToDone,
  loadAllToTodo,
} from "../store/repoSlice";
import { initLocalStorage } from "../storage/localstorage";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  marginLeft: "15%",
  marginRight: "15%",
  marginTop: 50,
  color: "#fff",
};

const linkStyle: React.CSSProperties = {
  textAlign: "start",
  marginLeft: "16%",
  marginRight: "15%",
  marginTop: 5,
  color: "#fff",
  marginBottom: 20,
};

export default function Board() {
  const [loading, setLoading] = useState(false);
  const { repository, todo, done, inProgress } = useAppSelector(
    (state) => state
  );
  // const repository = useAppSelector((state) => state.repository.repository);
  // const todoList = useAppSelector((state) => state.todo.todos);
  // const inProgressList = useAppSelector((state) => state.inProgress.inProgress);
  // const doneList = useAppSelector((state) => state.done.done);
  const dispatch = useAppDispatch();

  const loadRepositoryInformation = (owner: string, repo: string) => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((response) => response.json())
      .then((data: IRepository) => {
        console.log(data);
        if (data) {
          const res = initLocalStorage(data.full_name, data);
          if (res) {
            console.log("already there");
            initReduxWithDataFromLocalStorage(data.full_name);
          } else {
            addRepositoryInformation(data);
            loadIssues(owner, repo);
          }
        }
        setLoading(false);
      });
  };

  const initReduxWithDataFromLocalStorage = (fullName:string) => {
    const data = localStorage.getItem(fullName);
    if (data) {
      const repo = JSON.parse(data);
      console.log("data that is exist ; ",fullName)
      dispatch(addRepository(repo.repository));
      dispatch(loadAllToDone(repo.done));
      dispatch(loadAllToTodo(repo.todo));
      dispatch(loadAllToInProgres(repo.inProgress));
    }
  };

  const addRepositoryInformation = (data: IRepository) => {
    dispatch(addRepository(data));
  };

  const loadIssues = (owner: string, repo: string) => {
    fetch(`https://api.github.com/repos/${owner.trim()}/${repo.trim()}/issues`)
      .then((response) => response.json())
      .then((data: IIssue[]) => {
        const inProgressData = data.filter(
          (item: IIssue) => item.state === "open"
        );
        dispatch(loadAllToInProgres(inProgressData));
        const doneList = data.filter((item: IIssue) => item.state === "closed");
        dispatch(loadAllToDone(doneList));
        dispatch(loadAllToTodo([]));
      });
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      return;
    }
    const task = findItemById(draggableId, [...todo, ...inProgress, ...done]);

    if (task === undefined) return;

    if (source.droppableId === 2 || source.droppableId === "2") {
      dispatch(removeInProgres(task));
    } else if (source.droppableId === 1 || source.droppableId === "1") {
      dispatch(removeTodo(task));
    } else {
      dispatch(removeDone(task));
    }
    if (destination.droppableId === 2 || destination.droppableId === "2") {
      dispatch(addInProgres(task));
    } else if (
      destination.droppableId === 1 ||
      destination.droppableId === "1"
    ) {
      dispatch(addTodo(task));
    } else {
      dispatch(addDone(task));
    }
  };

  function findItemById(id: number, array: IIssue[]) {
    return array.find((item: any) => item.id == id);
  }

  const onSearch = (value: string) => {
    const valueArray = value.split("/");
    setLoading(true);
    loadRepositoryInformation(
      valueArray[valueArray.length - 2],
      valueArray[valueArray.length - 1]
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{}}>
        <Layout>
          <Content style={contentStyle}>
            <Search
              placeholder="Enter Repo URL"
              enterButton="Load Issues"
              size="large"
              loading={loading}
              onSearch={onSearch}
            />
          </Content>
          <Content style={linkStyle}>
            <a
              href={repository?.owner.html_url}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 18, marginRight: 2 }}
            >
              {repository?.owner.login}
            </a>
            {repository.full_name != "" ? (
              <span style={{ color: "black", fontSize: 18, marginRight: 2 }}>
                &gt;
              </span>
            ) : null}
            <a
              href={repository?.html_url}
              target="_blank"
              style={{ fontSize: 18 }}
            >
              {repository?.name}
            </a>
          </Content>
        </Layout>
      </div>
      <div
        className="row"
      >
        <Column title={"TO DO"} tasks={todo} id={"1"} />
        <Column title={"IN PROGRESS"} tasks={inProgress} id={"2"} />
        <Column title={"DONE"} tasks={done} id={"3"} />
      </div>
    </DragDropContext>
  );
}
