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
  const dateNow = Math.floor(new Date() / 8.64e7);
  const dateSelected = Math.floor(new Date(date) / 8.64e7);
  const timeSince = dateSelected - dateNow;

  const rtf1 = new Intl.RelativeTimeFormat('en', {
    localeMatcher: 'best fit', // other values: "lookup"
    numeric: 'auto', // other values: "auto"
    style: 'long', // other values: "short" or "narrow"
  });

  return rtf1.format(timeSince, 'day');
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
