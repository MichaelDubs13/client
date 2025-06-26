import Component from "../../Component";
import f_IOLink_Balluff_Slave1 from "./f_manufacturer/f_IOLink_Balluff_Slave1";

export default class f_IOLink_Modules extends Component{
    constructor(parent,index, ioModule, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_IOLink_Modules";
        this._class = "f_IOLink_Modules";
        this._name = `f_IOLink_Modules${index > 1 ? index : ""}`;
        this._port = port;
        this._ioModule = ioModule;
    }
    get Parameters(){
        return [
            {name: "s_IOLinkModuleLine", value: this._port.pinTargetLine, type: "String"},
            {name: "s_IOLinkModuleLocation", value: this._port.pinTargetLocation, type: "String"},
            {name: "s_IOLinkModuleDT", value: this._port.pinTargetDT, type: "String"},
        ];
    }
    build(){
        const ioLinkBalluffSlave = new f_IOLink_Balluff_Slave1(this, this._port);
        ioLinkBalluffSlave.build();
    }
    
}

