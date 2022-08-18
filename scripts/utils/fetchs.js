const fetchServer = async (req, method, header, body) => {
  return await fetch(`http://localhost:8080/${req}`, {
    method: method,
    headers: header,
    body: body,
  });
};

const formDataParser = (form) => {
  const formData = new FormData(form);
  const parsedData = {};
  Array.from(formData.entries()).forEach(([key, value]) => {
    parsedData[key] = value;
  });
  return JSON.stringify(parsedData);
};

export { fetchServer, formDataParser };
