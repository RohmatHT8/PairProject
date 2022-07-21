function getTime (date){
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
    return Math.floor(interval) + " years Ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
    return Math.floor(interval) + " months Ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
    return Math.floor(interval) + " days Ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
    return Math.floor(interval) + " hours Ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
    return Math.floor(interval) + " minutes Ago";
    }
    return Math.floor(seconds) + " seconds Ago";
}

module.exports = getTime