export const getAppointmentsForDay = (state, day) => {
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
