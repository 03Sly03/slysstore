const getError = (err) =>
  err.response && err.response.data.message
    ? err.resonse.data.message
    : err.message;

export { getError };
