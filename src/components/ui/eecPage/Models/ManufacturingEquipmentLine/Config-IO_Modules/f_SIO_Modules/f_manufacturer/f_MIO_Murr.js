import Component from "../../../Component";
import c_PartNumber from "./c_Murr/c_PartNumber";

export default class f_MIO_Murr extends Component{
    constructor(parent, ioModule) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-IO_Modules.Mechatronic.f_IO_module_selection.f_SIO_Modules.f_manufacturer";
        this._class = "f_MIO_Murr";
        this._name = `f_MIO_Murr`;
        this._ioModule = ioModule;
        this._partNumberOptions = ["55556","55557"]
        this._partNumber = this._ioModule.sioParts_Murr;
    }
    get Parameters(){
        return [
            
        ];
    }
    build(){
        var isValidPartNumber = this._partNumberOptions.includes(this._partNumber.toString());
        if(isValidPartNumber){
            var partNumber = new c_PartNumber(this, this._ioModule, this._partNumber)
            partNumber.build();
        }
    }
    
}

