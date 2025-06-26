import Component from "../../../Component";

export default class f_IOLink_Balluff_Slave2 extends Component{
    constructor(parent, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules.f_manufacturer";
        this._class = "f_IOLink_Balluff_Slave2";
        this._name = `f_IOLink_Balluff_Slave2`;
        this._port = port;
    }
    get Parameters(){
        return [
           
        ];
    }
    build(){

    }
    
}

