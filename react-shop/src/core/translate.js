import { createContext, useCallback, useContext, useState } from "react"

const Context = createContext({})

export const TranslateProvider = ({ children, language, translate = {} }) => {

    let [state, setState] = useState({
        language: localStorage.getItem('lang') || language,
        translate
    })

    const selectLang = useCallback((lang) => {
        setState({
            ...state,
            language: lang
        })

        localStorage.setItem('lang', lang)
    }, [])

    const t = (name) => {
        return state.translate[state.language]?.[name] || name
    }

    let value = {
        ...state,
        selectLang,
        t
    }


    return (
        <Context.Provider value={value}>{children}</Context.Provider>
    )
}




export const useTranslate = () => {
    return useContext(Context)
}