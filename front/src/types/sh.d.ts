declare namespace SH {
  export type SigninInput = {
    email: string;
    password: string;
  };

  export type SigninResult = {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  };

  export type User = {
    id: string;
    email: string;
  };
}
