// Turns a DRF/SimpleJWT error into { message, fields } for forms.
export function parseApiError(err) {
  if (!err.response) {
    return { message: 'Cannot reach the server. Check that the backend is running and try again.', fields: {} };
  }
  const data = err.response.data;
  const fields = {};
  let message = '';
  if (typeof data === 'string') {
    message = 'The server returned an unexpected response.';
  } else if (data && typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      const text = Array.isArray(value) ? value.join(' ') : String(value);
      if (key === 'detail' || key === 'non_field_errors') message = message ? `${message} ${text}` : text;
      else fields[key] = text;
    }
  }
  if (!message && !Object.keys(fields).length) message = 'Something went wrong. Please try again.';
  return { message, fields };
}
