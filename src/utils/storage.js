export const checkStorage = (item) => {
    return !!localStorage[item];
};

export const setItem =(item, value) => {
    if (!checkStorage(item)) {
        localStorage.setItem(item, value);
    }
}

/*обновляем значение*/ 
export const updateItem = (item, newValue) => {
    if (localStorage[item] < newValue) { 
        localStorage.setItem(item, newValue);
    }
}