/* eslint-disable */
import moment from 'moment';

export const createDate = (dateString) => {
    if (dateString) {
        return new moment(dateString);
    }
    return new moment();
}

export const formatDate = (dateString, format) => {
    let date = new moment();
    if (dateString) {
        date = new moment(dateString);
    }
    if (format) {
        return date.format(format);
    }
    return date.format('Do MMM YYYY');
}
/* eslint-enable */
export const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export const commaSeparate = (list, suffix) => {
    let commaString = '';
    for (let i = 0; i < list.length; i++) { // eslint-disable-line
        commaString += list[i];
        if (suffix) {
            commaString += suffix;
        }
        if (i < list.length - 1) {
            commaString += ', ';
        }
    }
    return commaString;
};

export const commaSeparateObj = (list, key, suffix) => {
    let commaString = '';
    for (let i = 0; i < list.length; i++) { // eslint-disable-line
        commaString += list[i][key];
        if (suffix) {
            commaString += suffix;
        }
        if (i < list.length - 1) {
            commaString += ', ';
        }
    }
    return commaString;
};
