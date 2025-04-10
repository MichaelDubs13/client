import Component from "../../../../../Component";
import sc_Pin2 from "./sc_BNI_pin/sc_Pin2";
import sc_Pin4 from "./sc_BNI_pin/sc_Pin4";

export default class c_Port extends Component{
    constructor(parent, port, ioModule, partnumber, io) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_MIO_Modules.f_manufacturer.c_Balluff.sc_BNI_port";
        this._class = `c_Port${port}`;
        this._name = `c_Port${port}`;
        this._io = io;
        this._ioModule = ioModule;
        this._partnumber = partnumber;
    }
    get Parameters(){
        return [

        ];
    }
    build(){
        if(this._io){
            if(this._io.io_pin == 2){
                const pin2 = new sc_Pin2(this, this._io);
                pin2.build();
            } else if(this._io.io_pin == 4){
                const pin4 = new sc_Pin4(this, this._io);
                pin4.build();
            }
        }
    }
    
}

