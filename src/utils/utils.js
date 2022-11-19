const isDefined = (val) =>(val != null && val != undefined && val != '');
const undefined = (val) => (!isDefined(val));
const isTrue = val => (val === true || val == 'true' || val == 'True');
const arrayHasItems = (val) => ( isDefined(val) && Array.isArray(val) && val.length > 0);

export {
    isDefined,
    undefined,
    isTrue,
    arrayHasItems
}