import validator from 'validator';
import isEmpty from './is-empty';

module.exports = function validatorRegisterInput(data){
    let errors = {};

    if (!validator.isLength(data.name, {min: 3, max: 15})){
        errors.name = 'Name must be between 3 and 15 characters'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
