import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log("props", props);
  const InterviewerArr = props.interviewers.map((singleInterviewer) => {
    return (
      <InterviewerListItem
        // id={singleInterviewer.id}
        name={singleInterviewer.name}
        avatar={singleInterviewer.avatar}
        selected={singleInterviewer.id === props.value}
        setInterviewer={() => {props.onChange(singleInterviewer.id)}}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerArr}</ul>
    </section>
  );
}
