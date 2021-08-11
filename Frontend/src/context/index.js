/** Dependencies */
import React, { createContext, useContext } from 'react'
import themeApp from './themeApp'

/** Contexts */
import visibilityOfWindows from './visibilityOfWindows'
import sessionContext from './sessionContext'

import flashMsgContext from './flashMsgContext'
import uploadPortfolioImg from './uploadPortfolioImg'
import commentsContext from './commentsContext'
import loaderBarVisibilityFunction from './loaderBarVisibility'

export const MyContext = createContext()

const MyProvider = ({ children }) => {
    const [theme, setTheme] = themeApp()

    const { loaderBarVisibility, setLoaderBarVisibility } =
        loaderBarVisibilityFunction()

    const {
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
        setEditProfileVisibility,
        editProfileVisibility
    } = visibilityOfWindows()

    const {
        flashMsgVisibility,
        progressMsgWidth,
        typeFlashMsg,
        flashMsg,
        showFlashMsg,
        closeFlashMsg
    } = flashMsgContext()

    const { session, setSession, authenticated, setAuthenticated } =
        sessionContext()

    const { uploadedFiles, setUploadedFiles } = uploadPortfolioImg()

    const { deleteCommentID, setDeleteCommentID } = commentsContext()

    return (
        <MyContext.Provider
            value={{
                theme,
                setTheme,

                loaderBarVisibility,
                setLoaderBarVisibility,

                windowOrModalOpen,
                loginVisibility,
                toggleLoginVisibility,
                session,
                setSession,

                authenticated,
                setAuthenticated,
                setLoginVisibility,

                registerVisibility,
                setRegisterVisibility,
                toggleRegisterVisibility,

                flashMsgVisibility,
                progressMsgWidth,
                typeFlashMsg,
                flashMsg,
                showFlashMsg,
                closeFlashMsg,

                privateProfileVisibility,
                setPrivateProfileVisibility,
                togglePrivateProfileVisibility,

                visibilityOfWindows,
                setEditProfileVisibility,
                editProfileVisibility,

                uploadedFiles,
                setUploadedFiles,

                deleteCommentID,
                setDeleteCommentID
            }}
        >
            {children}
        </MyContext.Provider>
    )
}

export const useContextValues = () => {
    const {
        theme,
        setTheme,

        loaderBarVisibility,
        setLoaderBarVisibility,

        windowOrModalOpen,
        loginVisibility,
        toggleLoginVisibility,

        session,
        setSession,

        authenticated,
        setAuthenticated,
        setLoginVisibility,

        registerVisibility,
        setRegisterVisibility,
        toggleRegisterVisibility,

        flashMsgVisibility,
        progressMsgWidth,
        typeFlashMsg,
        flashMsg,
        showFlashMsg,
        closeFlashMsg,
        privateProfileVisibility,
        setPrivateProfileVisibility,
        togglePrivateProfileVisibility,

        visibilityOfWindows,
        setEditProfileVisibility,
        editProfileVisibility,

        uploadedFiles,
        setUploadedFiles,

        deleteCommentID,
        setDeleteCommentID
    } = useContext(MyContext)

    return {
        theme,
        setTheme,

        loaderBarVisibility,
        setLoaderBarVisibility,

        windowOrModalOpen,
        loginVisibility,
        toggleLoginVisibility,

        session,
        setSession,

        authenticated,
        setAuthenticated,
        setLoginVisibility,

        registerVisibility,
        setRegisterVisibility,
        toggleRegisterVisibility,

        flashMsgVisibility,
        progressMsgWidth,
        typeFlashMsg,
        flashMsg,
        showFlashMsg,
        closeFlashMsg,
        privateProfileVisibility,
        setPrivateProfileVisibility,
        togglePrivateProfileVisibility,

        visibilityOfWindows,
        setEditProfileVisibility,
        editProfileVisibility,

        uploadedFiles,
        setUploadedFiles,

        deleteCommentID,
        setDeleteCommentID
    }
}

export default MyProvider
