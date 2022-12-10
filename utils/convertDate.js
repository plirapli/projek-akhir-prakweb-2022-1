const showFormattedDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const showFormattedDateDetail = (date) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(date).toLocaleDateString('en-GB', options);
};

const showTimeSince = (date) => {
  const rtf = new Intl.RelativeTimeFormat('en', {
    localeMatcher: 'best fit',
    numeric: 'auto',
    style: 'long',
  });
  let unit = 'day';
  let dateNowInMinute = Math.floor(new Date() / 60000);
  let dateSelectedInMinute = Math.floor(new Date(date) / 60000);
  let timeSince = dateNowInMinute - dateSelectedInMinute;

  if (timeSince <= 0) {
    unit = 'seconds';
  } else if (timeSince < 60) {
    unit = 'minutes';
  } else if (timeSince / 60 < 24) {
    timeSince /= 60;
    unit = 'hours';
  } else if (timeSince / (60 * 24) < 30) {
    timeSince /= 60 * 24;
    unit = 'days';
  }

  return rtf.format(Math.floor(timeSince * -1), unit);
};

const showFormattedCurrency = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    currencyDisplay: 'code',
  })
    .format(num)
    .replace('IDR', '')
    .trim();
};

const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

export {
  showFormattedDate,
  showFormattedDateDetail,
  showTimeSince,
  showFormattedCurrency,
  nFormatter,
};
