enum RegisterFormFields {
  username = "username",
  password = "password",
}

export const registerFields = [
  {
    type: "text",
    registerName: RegisterFormFields.username,
    placeholder: "username",
    label: "Username",
  },
  {
    type: "password",
    registerName: RegisterFormFields.password,
    placeholder: "password",
    label: "Password",
  },
];
