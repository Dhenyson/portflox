export default function loginValidation(email, password) {
    /** Individual verification of each field for a specific answer */

    /** Check email */
    if (!email) {
        return { status: 'error', msg: 'Email is required' }
    }
    var checkEmail = email.search(
        /^[a-zA-Z0-9.+_{|}-]{1,60}@[a-zA-Z0-9-_+]{1,60}\.[a-zA-Z0-9]{1,60}(?:\.[a-zA-Z0-9-_+]{0,30}[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,60}[a-zA-Z0-9])?)*$/
    )
    if (checkEmail != 0) {
        return { status: 'error', msg: 'Invalid email' }
    }

    /** Check password */
    if (!password) {
        return { status: 'error', msg: 'Password is required' }
    }
    if (password.length < 6) {
        return { status: 'error', msg: 'The password is too short' }
    }
    if (password.length > 60) {
        return { status: 'error', msg: 'The password is too long' }
    }

    /** if got here, then everything went well*/
    return {
        status: 'success',
        msg: 'success',
        data: { name, email, password }
    }
}
