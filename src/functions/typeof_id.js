const validateId = (id) => {
    const idArr = id.split("")
    const valid = "qwertyuioplkjhgfdsazxcvbnm".split("")
    // console.log(valid, "valid chars");
    //console.log(idArr, "input id");

    let check = true
    const maxI = idArr.length
    let n = 0;
    while (check && n < maxI) {
        const inc = valid.includes(idArr[n])
        n++
        if (inc) {
            check = false
        }
    }
    return check




}
export default validateId