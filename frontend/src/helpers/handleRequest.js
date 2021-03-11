export function extractRequestErrorMsg(json) {
  let detail = json?.detail
  if(Array.isArray(detail)) {
      detail = detail[0]?.msg
  }
  return detail;
}