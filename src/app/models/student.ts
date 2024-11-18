export interface StudentRecord {
    sid: string;
    fname: string;
    mname: string;
    lname: string;
  
    [key: string]: string | number;
  }