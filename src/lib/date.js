let year = new Date().getUTCFullYear();
let month = (new Date().getMonth() + 1);
let date = new Date().getDate();
// let newD;

if (month.toString().length === 1) {
    month = "0" + month
}
if (date.toString().length === 1) {
    date = "0" + date
}
let today = `${year}-${month}-${date}`;

// var dateNew = new Date(`${today}T00:00:00Z`);

// if (new Date().getDay() == 1) {   // Monday
//     var yesterday = dateNew - (1000 * 60 * 60 * 24) * 3;
//     newD = JSON.stringify(new Date(yesterday)).substr(1, 10);
// } else {
//     var yesterday = dateNew - 1000 * 60 * 60 * 24;
//     newD = JSON.stringify(new Date(yesterday)).substr(1, 10);
// }

module.exports = { today };