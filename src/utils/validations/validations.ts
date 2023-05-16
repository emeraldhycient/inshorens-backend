//following validatorjs methods

export const validations = {
    loginValidation: {
        email: 'required|email',
        password:'required|min:6'
    },
    registerValidation: {
        phoneNumber: 'required',
        firstName: 'required',
        lastName: 'required',
        email: 'required|email',
        password: 'required|min:6|max:20|confirmed'
    }
}