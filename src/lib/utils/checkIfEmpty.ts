export const checkIfEmpty = (arr): boolean => {
    let cnt = 0;
    for (let val of arr) {
        if (val === '') {
            cnt++;
        } else {
            cnt = 0;
            break;
        }
    }
    return cnt !== 0;
}