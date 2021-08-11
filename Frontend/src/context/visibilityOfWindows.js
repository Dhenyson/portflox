import { useState } from 'react'

export default function loginWindowsContext() {
    const [loginVisibility, setLoginVisibility] = useState(false)
    const [registerVisibility, setRegisterVisibility] = useState(false)
    const [editProfileVisibility, setEditProfileVisibility] = useState(false)
    const [privateProfileVisibility, setPrivateProfileVisibility] =
        useState(false)

    function toggleLoginVisibility() {
        setLoginVisibility(loginVisibility ? false : true)
    }
    function toggleRegisterVisibility() {
        setRegisterVisibility(registerVisibility ? false : true)
    }
    function togglePrivateProfileVisibility() {
        setPrivateProfileVisibility(privateProfileVisibility ? false : true)
    }
    function toggleEditProfileVisibility() {
        setEditProfileVisibility(editProfileVisibility ? false : true)
    }

    function windowOrModalOpen() {
        if (
            loginVisibility ||
            registerVisibility ||
            privateProfileVisibility ||
            editProfileVisibility
        ) {
            return true
        } else {
            return false
        }
    }
    return {
        windowOrModalOpen,
        loginVisibility,
        toggleLoginVisibility,
        setLoginVisibility,
        registerVisibility,
        setRegisterVisibility,
        toggleRegisterVisibility,
        privateProfileVisibility,
        setPrivateProfileVisibility,
        togglePrivateProfileVisibility,
        editProfileVisibility,
        setEditProfileVisibility,
        toggleEditProfileVisibility
    }
}
