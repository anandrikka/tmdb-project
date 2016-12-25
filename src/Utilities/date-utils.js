import Moment from 'moment';

const dateUtils = {
    createDate: (dateString) => {
        if (dateString) {
            return new Moment(dateString);
        }
        return new Moment();
    },
    formatDate: (dateString, format) => {
        let date = new Moment();
        if (dateString) {
            date = new Moment(dateString);
        }
        if (format) {
            return date.format(format);
        }
        return date.format('Do MMM YYYY');
    }
};

export default dateUtils;
