export default function serializeForm(formEl) {
  const formData = new FormData(formEl);
  const obj = {};

  formData.forEach((value, key) => {
        let keys = key.split('.');
        let last_key = keys.pop();

        keys.reduce(function(o, key) {
            return obj[key] = o[key] || {};
        }, obj)[last_key] = value;
  });
  
  return obj;
}