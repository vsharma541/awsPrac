import _ from 'lodash';
export const hello = () => {
    let str = 'hello';
    let mtr = _.toUpper(str);
    console.log(mtr);
    return mtr;
};