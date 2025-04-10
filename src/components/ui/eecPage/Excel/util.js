export const filterItemsByStartsOptions = (options, items, key) => {
    return items.filter(item => options.some(option => item[key].startsWith(option)));
}

export const findClosestHigherNumber = (array, target) => {
    if (!array || array.length === 0) {
      return null;
    }
  
    let nearest = array[0];
    let minDiff = array[0] - target
  
    for (let i = 1; i < array.length; i++) {
        const diff = array[i] - target;
        if(diff > 0){
            if (diff < minDiff) {
                minDiff = diff;
                nearest = array[i];
              }
        }
    }
    return nearest;
}

export const getCableLength = (options, length) =>{
    if(length){
        var cable_length = findClosestHigherNumber(options, length)
        return `${cable_length}`;
    } else {
        return `TBD`;
    }
}

export const splitIntoTwo = (source, delimiter) =>{
    if(source){
        var array = source.split(delimiter);
        
        if(array.length > 1){
            return [array[0],array[1]]
        } else {
            return [array[0], ""]
        }
    } else {
        return ["",""]
    }
}

