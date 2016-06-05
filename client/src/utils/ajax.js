
export default (method, url) => (new Promise((resolve, reject) => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status / 100 === 2) {
        resolve(JSON.parse(xmlhttp.response));
      } else {
        reject(JSON.parse(xmlhttp.response));
      }
    }
  };
  xmlhttp.open(method, url, true);
  xmlhttp.send();
}));
