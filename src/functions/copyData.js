const copyData = input => {
    const firstStage = JSON.stringify(input);
    const secondStage = JSON.parse(firstStage)
    return secondStage
}
export default copyData
// This function makes deep copy of serialized data, like objects and arrays.