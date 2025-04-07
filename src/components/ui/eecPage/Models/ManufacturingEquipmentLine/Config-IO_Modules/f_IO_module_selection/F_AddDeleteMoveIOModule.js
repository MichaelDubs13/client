import Component from "../../Component";

export default class F_AddDeleteMoveIOModule extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection";
        this._class = "f_AddDeleteMoveIOModule";
        this._name = `f_AddDeleteMoveIOModule`;
        this._io = io;
    }
    get Parameters(){
        return [
           
        ];
    }
    build(){

    }
    
}

