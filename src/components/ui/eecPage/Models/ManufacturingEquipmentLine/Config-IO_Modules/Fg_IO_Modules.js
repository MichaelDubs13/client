import Component from "../Component";
import Fg_IOModule from "./Fg_IOModule";

export default class Fg_IO_Modules extends Component{
    constructor(parent, ios) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_IO_Modules.fg_IO_Modules";
        this._name = `fg_IO_Modules`;
        this._ios = ios;
    }

    get Parameters(){
        return [
            {name: "i_NumberOfIOModuleGroups", value: this._ios.length, type: "Integer"},
        ];
    }

    build(){
        for(let i=0; i < this._ios.length; i++){
            const io = this._ios[i];
            const fg_IOModule = new Fg_IOModule(this, io);
            fg_IOModule.build();
        }
    }
    
}

