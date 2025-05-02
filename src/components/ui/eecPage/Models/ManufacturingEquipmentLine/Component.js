export default class Component {
    constructor(parent){
        if(parent){
            this._parent = parent;
            this._parent.Components.push(this);
        }
        this._isProjectPath = false;
        this._projectPath = "";
        this._classPath = "";
        this._class = "";
        this._name = "";
        this._dTCounter = "00";
        //this.Parameters =[];
        this.Components = [];
    }
    get ClassPath(){
        return this._classPath;
    }
    get ProjectPath(){
        return this._projectPath;
    }

    get Path(){
        if(this._isProjectPath){
            return this._parent ? `${this._parent.ProjectPath}` : `${this.ProjectPath}`;
        } else {
            return this._parent ? `${this.ClassPath}` : ``;
        }   
    }

    get Class() {
        return `${this.Path}.${this._class}`;
    }
    get Name() {
        return this._name;
    } 
    get DTCounter() {
        return this._dTCounter;
    }
    create(doc){
        const mo = this.createMo(doc);
        this.Components.forEach(component => {
            mo.appendChild(component.create(doc));
        });

        return mo;
    };

    createWithoutParameter(doc){
        const mo = this.createMoWithoutParameter(doc);
        return mo;
    }

    createMo(doc){
        var elem = doc.createElement("mo");
        elem.setAttribute("name", this._name);
        elem.setAttribute("typeClass", this.Class);
        
        this.Parameters.forEach(parameter => {
            var param = this.createParameter(doc,parameter);
            elem.appendChild(param);
        })

        return elem;
    };

    createMoWithoutParameter(doc){
        var elem = doc.createElement("mo");
        elem.setAttribute("name", this._name);
        elem.setAttribute("typeClass", this.Class);

        return elem;
    };

    createParameter(doc, parameter){
        var elem = doc.createElement("parameter");
        elem.setAttribute("name", parameter.name);

        if(parameter.type === "arrayList"){
            var valueElem = doc.createElement("value");
            var arrayListElem = doc.createElement("arrayList");
            valueElem.appendChild(arrayListElem);
            elem.appendChild(valueElem);

        } else if(parameter.type === "hashMap") {
            var valueElem = doc.createElement("value");
            var arrayListElem = doc.createElement("hashMap");
            valueElem.appendChild(arrayListElem);
            elem.appendChild(valueElem);
        } else {
            elem.setAttribute("type", parameter.type);
    
            if (parameter.type == "Boolean") {
                if(parameter.value){
                    elem.setAttribute("value", true);            
                } else {
                    elem.setAttribute("value", false); 
                } 
            } else if(parameter.type == "Integer"){
                if(parameter.value){
                    elem.setAttribute("value", parameter.value);            
                } else {
                    elem.setAttribute("value", 0); 
                }
            } else if(parameter.type == "Double"){
                if(parameter.value != null){
                    var number = Number(parameter.value)
                    elem.setAttribute("value", parseFloat(number.toFixed(2)));            
                } else {
                    elem.setAttribute("value", "0.0"); 
                }
            }else if(parameter.type == "String"){
                if(parameter.value){
                    elem.setAttribute("value", parameter.value);            
                } else {
                    elem.setAttribute("value", "Undefined"); 
                }
            } else {
                if(parameter.value){
                    elem.setAttribute("value", parameter.value);            
                }
            }
        }
        
        return elem;
    };
    get Parameters(){
        return [];
    };

    build(){
        
    }
}