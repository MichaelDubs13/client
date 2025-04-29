import Component from "../../Component";
import IO_Module from "../IO_Module";

export default class F_AddDeleteMoveIOModule extends Component{
    constructor(parent, ioModuleGroup) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection";
        this._class = "f_AddDeleteMoveIOModule";
        this._name = `f_AddDeleteMoveIOModule`;
        this._ioModuleGroup = ioModuleGroup;
    }
    get Parameters(){
        return [
            {name: "i_NumberOfMasterIOModules", value: this._ioModuleGroup.length, type: "Integer"},
        ];
    }
    build(){
         for(let i=0; i < this._ioModuleGroup.ioModules.length; i++){
            
            const ioModule = new IO_Module(this, i+1, this._ioModuleGroup.ioModules[i])
            ioModule.build();
        }
    }
    
}

