import React, { useState } from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {
  // console.log("daylist props", props)
  const DayArr = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });
  
  return <ul>{DayArr}</ul>
}