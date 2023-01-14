export function getAppointmentsForDay (state, day) {
  const foundDay = state.days.find((singleDay) => {
    return singleDay.name === day;
  });

  if ((state.days).length === 0 || !foundDay) {
    return [];
  }

  const appointments = foundDay.appointments;

  const result = appointments.map((id) => {
    return state.appointments[id];
  });

  return result;
};

export function getInterviewersForDay (state, day) {
  const foundDay = state.days.find((singleDay) => {
    return singleDay.name === day;
  });

  if ((state.days).length === 0 || !foundDay) {
    return [];
  }

  const interviewers = foundDay.interviewers;

  const result = interviewers.map((id) => {
    return state.interviewers[id];
  });

  return result;
};

export function getInterview (state, interview) {
  if (!interview) return null

  const selectedInterview = {
    student : interview.student,
    interviewer : state.interviewers[interview.interviewer]
  }

  return selectedInterview;
}
