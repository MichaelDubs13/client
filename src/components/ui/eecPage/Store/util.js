export function formatToTwoDigits(number) {
    return String(number).padStart(2, '0');
}

export function getItemById(items, id){
    for(let i=0;i<items.length;i++){
        const item = this.items[i];
        if(item.data.id === id) return item;
        if(item.hasOwnProperty("getItemById")){
            var foundItem = item.getItemById(id);
            if(foundItem) return foundItem;
        }
      }
      return null;
}

export function addItems(newItems, numberOfItems, create){
    const diff = numberOfItems - newItems.length
    if(diff > 0){
      for (let i = 0; i < diff; i++) {
        const number = newItems.length
        var item = create(number);
        newItems.push(item);
      } 
    } else if(diff < 0) {
        newItems = newItems.slice(0, newItems.length + diff);
    }

    return newItems;
}

export function setNumberOfItems(newItems, numberOfItems, create, parent){
    const diff = numberOfItems - newItems.length
    if(diff > 0){
      for (let i = 0; i < diff; i++) {
        const number = newItems.length
        var item = create(parent, number);
        newItems.push(item);
      } 
    } else if(diff < 0) {
        newItems = newItems.slice(0, newItems.length + diff);
    }

    return newItems;
}

export function setModelValue(item, key, value, isUI, isData){
    if(isUI){
        item.UI[key] = value
    } else if(isData){
        item.data[key] = value
    } else {
        item[key] = value;
    }

    return item;
}

export function circularReplacer() {
    const seen = new WeakSet();
    return function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return; // Skip the circular reference
        }
        seen.add(value);
      }
      return value;
    };
}

export function recreateArrayElement(parent, array, create){
  var newArray = array.map(item => {
    if(parent.data.type ==='pdp'){
      console.log(create)
    } 
    const newItem = create();      
    if(parent.data.type ==='pdp'){
      console.log(newItem)
    } 
      Object.assign(newItem, item);
      newItem.data.parent = parent;
      return newItem
  })

  return newArray;
}

export function recreateBranchCircuit(parent, amperage, array, create){     
  console.log(parent);
  var newArray = array.map(item => { 
    console.log(parent)
    console.log(amperage)
    const newItem = create(parent, amperage); 
    // console.log(newItem)
    Object.assign(newItem, item);
    newItem.data.parent = parent;
    return newItem;
  })

  return newArray;
}

export function recreateObject(item, create){
  const newItem = create();
  Object.assign(newItem, item);
  return newItem;
}