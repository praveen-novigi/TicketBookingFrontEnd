const url= process.env.BACKEND_API_URL;
const sender_id = 'default';
console.log(process.env);
//ChatBot_API_Handling
export const userRequest = (message) => {
    return fetch("http://65.0.34.7:5006/webhooks/rest/webhook", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sender: sender_id }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };