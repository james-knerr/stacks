import { RecordVM } from './record-vm';

export class StackListVM {
    public id: string;
    public title: string;
    public isDeleted: boolean;
}

export class StackVM {
    public id: string;
    public title: string;
    public isDeleted: boolean;
    public records: RecordVM[];
}
