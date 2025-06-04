export const isNumberValidation = (value) =>{
    return !isNaN(value) || 'Please enter a valid number'
}

export const isNumberLessThanValidation = (limit, value) =>{
    return value <= limit || `Please enter a valid number less than ${limit+1}`;
}

export const isValidIP = (str)=> {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
    return (!str ? true : ipv4Regex.test(str)) || 'Please enter a valid ip address'
}

export function isAAAANN(str) {
  const regex = /^[a-zA-Z]{3,4}\d{2}$/;
  return regex.test(str);
}

export function isNNNNN(str) {
  const regex = /^\d{5}$/;
  return regex.test(str);
}

export function isAAAANN_NNN(str) {
  const regex = /^[a-zA-Z]{2,4}\d{2,3}.\d{2,3}$/;
  return regex.test(str);
}
export function isNNNNN_AANN(str) {
  const regex = /^\d{5}\.[a-zA-Z]{2,4}\d{2,3}$/;
  return regex.test(str);
}

export function isNNNNN_NNN(str) {
 const regex = /^\d{5}\.\d{3}$/;
  return regex.test(str);
}

export function isValidLocation(str){
  if(isAAAANN(str)) return true;
  if(isNNNNN(str)) return true;
  if(isNNNNN_AANN(str)) return true;
  if(isAAAANN_NNN(str)) return true;
  if(isNNNNN_NNN(str)) return true;

  return 'not valid location name'
}