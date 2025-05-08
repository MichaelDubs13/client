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