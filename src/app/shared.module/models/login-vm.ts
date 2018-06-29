import { StackListVM } from './stack-vm';

export class LoginVM {
    public username: string;
    public password: string;
}

export class LoginResponseVM {
    public stacks: StackListVM[];
    public sessionInfo: SessionInfoVM;
}

export class SessionInfoVM {
    public idToken: string;
    public username: string;
}
