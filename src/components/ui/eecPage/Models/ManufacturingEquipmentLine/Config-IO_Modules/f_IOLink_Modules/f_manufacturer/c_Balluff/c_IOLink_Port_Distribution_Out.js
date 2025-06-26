import Component from "../../../../Component";

export default class c_IOLink_Port_Distribution_Out extends Component{
    constructor(parent, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules.f_manufacturer.c_Balluff";
        this._class = "c_IOLink_Port_Distribution_Out";
        this._name = `c_IOLink_Port_Distribution_Out`;
        this._port = port;
    }
    get Parameters(){
        return [
           
        ];
    }
    build(){

    }
    
}

