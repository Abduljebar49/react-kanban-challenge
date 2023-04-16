import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-top: 6px;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;
function bgcolorChange(props: any) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#CED4DA"
    : props.isBacklog
    ? "#F2D7D5"
    : "#FFF";
}

export default function Task({ task, index }: { task: any; index: number }) {
  function getCalculatedDateDifference(createdDate: Date) {
    const todayDate = new Date(Date.now());
    const openedDate = new Date(createdDate);
    const diffTime = Math.abs(todayDate.getTime() - openedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided: any, snapshot: any) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div
            style={{
              display: "relative",
              justifyContent: "start",
              textAlign: "start",
              padding: 2,
            }}
          >
            <span style={{ fontWeight: "bold" }}>
              {task.title}
              {"  "}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              padding: 2,
              marginTop: 3,
            }}
          >
            #<span>{task.number}</span>&nbsp;Opened&nbsp;
            <span>
              {getCalculatedDateDifference(task.created_at)} &nbsp;days ago
            </span>
            {/* <TextContent>{task.title}</TextContent> */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
              marginTop: 3,
            }}
          >
            <span>
              {task.author_association} | Comments: {task.comments}
            </span>
            <Icons>
              <div>
                <a href={task.user.html_url} target="_blank" rel="noopener noreferrer">
                  <Avatar
                    src={task.user.avatar_url}
                  />
                </a>
              </div>
            </Icons>
          </div>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
