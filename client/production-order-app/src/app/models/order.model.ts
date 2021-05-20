import { Type } from '../enums/type.enum';
import { State } from '../enums/state.enum';

export class Order {
    public _id: number;
    public _state: State;
    public _created: number;
    public _type: Type;

    constructor() {
        // NOOP
    }

    get id(): number {
        return this._id;
    }
    get state(): State {
        return this._state;
    }
    get created(): number {
        return this._created;
    }
    get type(): Type {
        return this._type;
    }

    set id(value: number) {
        this._id = value;
    }
    set state(value: State) {
        this._state = value;
    }
    set created(value: number) {
        this._created = value;
    }
    set type(value: Type) {
        this._type = value;
    }
}
