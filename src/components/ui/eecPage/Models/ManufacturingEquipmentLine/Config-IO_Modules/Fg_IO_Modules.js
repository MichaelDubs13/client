import Component from "../Component";
import Fg_IOModule from "./Fg_IOModule";

export default class Fg_IO_Modules extends Component{
    constructor(parent, ioModuleGroups) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_IO_Modules.fg_IO_Modules";
        this._name = `fg_IO_Modules`;
        this._ioModuleGroups= ioModuleGroups;
    }

    get Parameters(){
        return [
            {name: "i_NumberOfIOModuleGroups", value: this._ioModuleGroups.length, type: "Integer"},
        ];
    }

    build(){
        for(let i=0; i < this._ioModuleGroups.length; i++){
            const ioModuleGroup = this._ioModuleGroups[i];
            const fg_IOModule = new Fg_IOModule(this, i+1, ioModuleGroup);
            fg_IOModule.build();
        }
    }
    
}

