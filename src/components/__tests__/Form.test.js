import React from "react";

import { render, cleanup, getByPlaceholderText, getByTestId } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  const { getByPlaceholderText, getByTestId } = render(<Form interviewers={interviewers} name="Lydia Millar-Jones" />);

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders without student name if not provided", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
});