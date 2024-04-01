interface IUserProjectInput {
  hours_worked: number;
  id_user: number;
  id_project: number;
}

interface IUserProjectOutput {
  id: number;
  hours_worked: number;
  id_user: number;
  id_project: number;
}

export { IUserProjectInput, IUserProjectOutput };
