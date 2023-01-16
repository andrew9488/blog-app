enum LoginFormFields {
  username = "username",
  password = "password",
}

export const loginFields = [
  {
    type: "text",
    registerName: LoginFormFields.username,
    placeholder: "username",
    label: "Username",
  },
  {
    type: "password",
    registerName: LoginFormFields.password,
    placeholder: "password",
    label: "Password",
  },
];
