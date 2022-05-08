// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : `0${n}`
// }

function formatTime(time) {
  let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000);
  date = date.toJSON();
  date = date.substring(0,19).replace('T',' ')
  return date;
}

// function formatTimeminute(time) {
//   const date = formatNumber(time.getMinutes());
//   // let date = new Date(new Date(time).getTime() + 60 * 1000);
//   // date = date.toJSON();
//   // date = date.substring(0,19).replace('T',' ')
//   return date;
// }

module.exports = {
  formatTime,
}
