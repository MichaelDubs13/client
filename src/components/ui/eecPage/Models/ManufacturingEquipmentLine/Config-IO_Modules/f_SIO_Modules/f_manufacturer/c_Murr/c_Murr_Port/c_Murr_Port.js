import Component from "../../../../../Component";
import sc_Murr_Pin2 from "./sc_Murr_Pin/sc_Murr_Pin2";
import sc_Murr_Pin4 from "./sc_Murr_Pin/sc_Murr_Pin4";

export default class c_Murr_Port extends Component{
    constructor(parent, index, ioModule, partnumber, port) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer.c_Murr.c_Murr_Port";
        this._class = `c_Murr_Port${index}`;
        this._name = `c_Murr_Port${index}`;
        this._port = port;
        this._ioModule = ioModule;
        this._partnumber = partnumber;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){
        // if(this._port){
        //     if(this._io.io_pin == 2){
        //         const pin2 = new sc_Murr_Pin2(this, this._io);
        //         pin2.build();
        //     } else if(this._io.io_pin == 4){
        //         const pin4 = new sc_Murr_Pin4(this, this._io);
        //         pin4.build();
        //     }
        // }
        const pin4 = new sc_Murr_Pin4(this,this._port);
        pin4.build()
    }
    
}

