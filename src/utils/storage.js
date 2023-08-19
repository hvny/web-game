export const checkStorage = (item) => {
    return !!localStorage[item];
};

export const setItem =(item, value) => {
    if (!checkStorage(item)) {
        localStorage.setItem(item, value);
        console.log("setItem");
    }
}

/*обновляем значение*/ 
export const updateItem = (item, newValue) => {
    localStorage.setItem(item, newValue);
}