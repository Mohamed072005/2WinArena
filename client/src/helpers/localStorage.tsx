export const getLocalStorage = (parameter: string) => {
    return localStorage.getItem(parameter);
}

export const setLocalStorage = (parameter: string, content: string) => {
    localStorage.setItem(parameter, content);
}

export const removeLocalStorage = (parameter: string) => {
    localStorage.removeItem(parameter);
}