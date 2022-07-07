export class WorkOrderDetails {
    id: number;
    description:string;
    device:string;
    engineer:Engineer;
    requestDate:Date;
    serviceDate: string;
}

interface Engineer {
    name: string;
    id: string;
  }

  export class WorkOrder {
    id: number;
    device:string;
    engineer:string;
}
