export const isNumberValidation = (value) =>{
    return !isNaN(value) || 'Please enter a valid number'
}

export const isNumberLessThanValidation = (limit, value) =>{
    return value <= limit || `Please enter a valid number less than ${limit+1}`;
}