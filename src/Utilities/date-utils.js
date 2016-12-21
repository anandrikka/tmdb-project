import Moment from 'moment';

const dateUtils = {
    createDate: (dateString) => {
        if (dateString) {
            return new Moment(dateString);
        }
        return new Moment();
    }
};

export default dateUtils;
