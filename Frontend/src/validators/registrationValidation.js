export default function registerValidation(
    name,
    email,
    password,
    passwordRepetition
) {
    /** Individual verification of each field for a specific answer */

    /** Check name */
    if (!name) {
        return { status: 'error', msg: 'Name is required' }
    }
    if (name.length > 50) {
        return { status: 'error', msg: 'The name is too long' }
    }
    if (name.length < 3) {
        return { status: 'error', msg: 'The name is too short' }
    }

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

    /** Check password match */
    if (!passwordRepetition) {
        return { status: 'error', msg: 'Password is required' }
    }
    if (password != passwordRepetition) {
        return { status: 'error', msg: 'Passwords do not match' }
    }

    /** if got here, then everything went well*/

    return {
        status: 'success',
        msg: 'success',
        data: { name, email, password }
    }
}
