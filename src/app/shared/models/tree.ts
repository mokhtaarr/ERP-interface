


export  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    jobId : number;
    level: number;
    nameEn:String
    jname1:string
  }

  export interface FoodNode {
    name: string;
    Id:number;
    children?: FoodNode[];
  }

  export interface ExampleFlatNode2 {
    expandable: boolean;
    level: number;
    departMentId : number;
    departCode : string;
    name: string;
    departName2: string;
    departTask:string;
    remarks : string;
    parentId : number;
  }

  export interface JobTree {
    expandable: boolean;
    level: number;
    jobId : number;
    departMentId : number;
    parentId : number;
    jcode : string;
    jname1: string;
    jname2: string;
    remarks : string;
    jresponsibilities:string;
    jqualifications:string;
    jdesc:string;
    jduties:string;
    standardMonthlyWage:number;
    standardHolyDays:number;
    standardDailyWage:number;
    standardDailyWorkHours:number;
    standardHourlyWage:number;
    numberAvailable:number;
  }