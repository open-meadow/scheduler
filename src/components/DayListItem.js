import React, { useState } from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  console.log("daylistitem props:", props);
  let dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : (props.spots === 0)
  });

  return (
    <li
      onClick={() => {
        props.setDay(props.name);
      }}
      className={dayListItemClass}
    >
      <h2>{props.name}</h2>
      <h3>{props.spots} spots remaining</h3>
    </li>
  );
}
