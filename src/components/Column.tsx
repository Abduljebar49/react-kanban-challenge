import React from "react";
import styled from "styled-components";
import Task from "./Task";
import "../styles/column.css";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: #CED4DA;
  border-radius: 2.5px;
  width: 350px;
  height: 475px;
  border: 1px solid gray;
  margin-left:10px;
  margin-right:10px;

`;

const Title = styled.h3`
  padding: 8px;
  background-color: pink;
  text-align: center;
  margin-left:10px;
  margin-right:10px;
`;

const TaskList = styled.div`
  padding: 3px;
  transistion: background-color 0.2s ease;
  background-color: #CED4DA;
  flex-grow: 1;
  min-height: 100px;
`;

type ColumnProps = {
  title: string;
  tasks: [];
  id: number;
};

export default function Column({
  title,
  tasks,
  id,
}: {
  title: any;
  tasks: any;
  id: any;
}) {
  return (
    <div>
      <Title
        style={{
          backgroundColor: "lightblue",
          position: "sticky",
        }}
      >
        {title}
      </Title>
    <Container className="column">
      <Droppable droppableId={id}>
        {(provided: any, snapshot: any) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task: any, index:number) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
    </div>
  );
}
