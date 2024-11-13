declare namespace Express {
  export interface Request {
    sh: {
      verifiedToken?: SH.JWTData;
      user?: SH.User;
      users?: SH.User[];
      document?: SH.Document;
      documents?: SH.Document[];
    };
  }
}
