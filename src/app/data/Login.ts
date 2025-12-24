export type LoginInputData = {
  id: number;
  placeholder: string;
  type: string;
  name: string;
};

export type LoginStatus = {
  id: number;
  title: string;
  name: string;
  href?: string;
};

export const LoginInputData: LoginInputData[] = [
  {
    id: 1,
    placeholder: "이메일",
    type: "email",
    name: "email",
  },
  {
    id: 2,
    placeholder: "비밀번호",
    type: "password",
    name: "password",
  },
];
