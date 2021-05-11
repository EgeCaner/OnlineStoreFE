export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = 'http://localhost:5000/Authentication/Login';

  //console.log("inside service");
  //console.log(request);
  const parameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request.payload)
  };

  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then(response => {
      //console.log("hey1");
      //console.log(response);
      return response.json();
    })
    .then(json => {
      //console.log("hey");
      return json;
    });
  }
 