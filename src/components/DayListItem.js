import React, { useState } from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  // console.log("daylistitem props:", props);
  let dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = () => {
    return props.spots === 0 || props.spots > 1
      ? "spots remaining"
      : "spot remaining";
  };

  return (
    <li
      onClick={() => {
        props.setDay(props.name);
      }}
      className={dayListItemClass}
      data-testid="day"
    >
      <h2>{props.name}</h2>
      {props.spots && (
        <h3>
          {props.spots} {formatSpots()}
        </h3>
      )}
      {!props.spots && <h3>no {formatSpots()}</h3>}
    </li>
  );
}
