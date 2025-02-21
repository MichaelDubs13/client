import Component from "../../Component";
import C_LETH_Interface from "./C_LETH_Interface";

export default class C_LETH extends Component{
    constructor(parent, mcp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_LETH";
        this._class = "c_LETH";
        this._name = "c_LETH";   
        this._mcp = mcp;   

        const port2 = mcp.leth_port2.split("-");
        this._port2_location = port2[0]
        this._port2_dt = port2[1]

        const port3 = mcp.leth_port3.split("-");
        this._port3_location = port3[0]
        this._port3_dt = port3[1]

        const port4 = mcp.leth_port4.split("-");
        this._port4_location = port4[0]
        this._port4_dt = port4[1]
    }

    get Parameters(){
        return [
            {name: "Local_IP", value: this._mcp.leth_sw_ip, type: "String"},
            {name: "Local_Secondary_IP", value: "Undefined", type: "String"},
            {name: "PLC_IP", value: this._mcp.plc_local_x1_ip, type: "String"},
            {name: "Plant_IP", value: this._mcp.ked_plant_ip, type: "String"},
            {name: "Gigabit_Port2_Location", value: this._port2_location, type: "String"},
            {name: "Gigabit_Port2_DT", value: this._port2_dt, type: "String"},
            {name: "Gigabit_Port2_TargetPort", value: "Undefined", type: "String"},
            {name: "Gigabit_Port3_Location", value: this._port3_location, type: "String"},
            {name: "Gigabit_Port3_DT", value: this._port3_dt, type: "String"},
            {name: "Gigabit_Port3_TargetPort", value: "Undefined", type: "String"},
            {name: "Gigabit_Port4_Location", value: this._port4_location, type: "String"},
            {name: "Gigabit_Port4_DT", value: this._port4_dt, type: "String"},
            {name: "Gigabit_Port4_TargetPort", value: "Undefined", type: "String"},
            {name: "Gigabit_Port2_CableLength", value: "1.5 m", type: "String"},
            {name: "Gigabit_Port3_CableLength", value: "1.5 m", type: "String"},
            {name: "Gigabit_Port4_CableLength", value: "1.5 m", type: "String"},

        ];
    }

    build(){
        const leth_interface = new C_LETH_Interface(this);
    }
}
