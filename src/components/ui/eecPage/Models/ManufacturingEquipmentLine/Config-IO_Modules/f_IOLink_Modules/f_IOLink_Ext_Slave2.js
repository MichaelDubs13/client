import Component from "../../Component";

export default class f_IOLink_Ext_Slave2 extends Component{
    constructor(parent, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules";
        this._class = "f_IOLink_Ext_Slave2";
        this._name = `f_IOLink_Ext_Slave2`;
        this._io = io;
    }
    get Parameters(){
        return [
           
        ];
    }
    build(){

    }
    
}

