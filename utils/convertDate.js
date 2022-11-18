const showFormattedDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Date(date).toLocaleDateString('en-GB', options);
};

export { showFormattedDate };
