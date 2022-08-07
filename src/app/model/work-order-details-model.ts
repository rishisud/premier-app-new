export class WorkOrderDetails {
    id: number;
    description:string;
    device:string;
    engineer:string;
    requestDate:Date;
    serviceDate: Date;
}

export interface Engineer {
    name: string;
    id: string;
  }

  export class WorkOrder {
    id: number;
    workorder_id:string;
    device:string;
    engineer:string;
}
