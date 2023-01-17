import React from "react";

import {
  render,
  cleanup,
  getByPlaceholderText,
  getByTestId,
  fireEvent,
} from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  // renders without student name if not provided
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  // renders with student name if not provided
  it("renders with student name if not provided", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  // validates that the student name is not blank
  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        interviewer={interviewers[0]}
        onSave={onSave}
      />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  // validates that the student name is not blank
  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onSave={onSave}
      />
    );
    fireEvent.click(getByText("Save"));
    
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  // calls onSave function when the name is defined
  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn()
    const { queryByText, getByText } = render(
      <Form
        interviewers={interviewers}
        interviewer={interviewers[0].id}
        student="Lydia Miller-Jones"
        onSave={onSave}
      />
    );
    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});
