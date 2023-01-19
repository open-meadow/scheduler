import React from "react";
import classNames from "classnames";

import "components/styles/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // find interviewerListItemClass
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewerListItemClass}>
      <img
        onClick={props.setInterviewer}
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
