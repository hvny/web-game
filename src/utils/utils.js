export function removeAllChilds(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}