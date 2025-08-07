export const registerFormValidates = (input) => {
  const errors = {};

  if (!input.name.trim()) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s']+$/.test(input.name)) {
    errors.name = "Name must be a valid name";
  }

  if (!input.email.trim()) {
    errors.email = "Mail is required";
  } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = "Mail must be a valid email address";
  }

  if (!input.birthdate) {
    errors.birthdate = "Birthdate is required";
  } else {
    const today = new Date();
    const birthdate = new Date(input.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      errors.birthdate = "User must be at least 18 years old";
    }
  }

  if (!input.nDni) {
    errors.nDni = "nDni is required";
  } else if (!/^\d+$/.test(input.nDni)) {
    errors.nDni = "nDni must contain only numbers";
  } else if (input.nDni.length < 7 || input.nDni.length > 8) {
    errors.nDni = "nDni must be between 7 and 8 digits long";
  }

  if (!input.username.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "Username must contain only letters and numbers";
  }

  if (!input.password.trim()) {
    errors.password = "Password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#\$%\^&\*]/.test(input.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};

// Nueva función agregada para validación de login
export const loginFormValidate = (input) => {
  const errors = {};

  if (!input.username.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "Username must contain only letters and numbers";
  }

  if (!input.password.trim()) {
    errors.password = "Password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};

const isTimeValid = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute;
  const startTime = 8 * 60;
  const endTime = 18 * 60;

  return totalMinutes >= startTime && totalMinutes <endTime;
}




export const dateTimeValidates = (inputs) => {
  const errors = {};
  const { date, time } = inputs;
  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (!date) {
    errors.date = "La fecha es obligatoria";
  } else if (selectedDateTime < now) {
    errors.date = "No puedes seleccionar una fecha pasada";
  } else if (selectedDateTime < twentyFourHoursLater) {
    errors.date = "Debes seleccionar una fecha con al menos 24 horas de anticipación";
  } else if (
    selectedDateTime.getDay() === 0 ||
    selectedDateTime.getDay() === 6
  ) {
    errors.date = "No se pueden agendar turnos los fines de semana";
  }

  if (!time) {
    errors.time = "La hora es obligatoria";
  } else if (!isTimeValid(time)) {
    errors.time = "La hora debe estar entre las 8 AM y las 6 PM";
  }

  return errors;
};
