export function saveDocument(list, ev) {
    list.push(ev);
}
export function deleteDocument(list,ev) {
    const fileIndex = list.indexOf(ev);
    list.splice(fileIndex, 1);
}

