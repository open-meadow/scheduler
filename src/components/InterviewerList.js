import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

// create and export the list of available interviewers
export default function InterviewerList(props) {
  const InterviewerArr = props.interviewers.map((singleInterviewer) => {
    return (
      <InterviewerListItem
        key={singleInterviewer.id}
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
