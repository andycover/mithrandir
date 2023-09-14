// apihandler.js

// Function to handle REST API calls
export const callApi = async (url, requestData = null) => {
  try {
    
    const headers = {
      'Content-Type': 'application/json',
    };

    const options = {
      method: "POST",
      headers,
    };

    if (requestData) {
      options.body = JSON.stringify(requestData);
    }

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Something went wrong.');
    }
    

  /*
   const responseData = "No data"

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);  // Log the response from the server
      responseData = data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
    */
    //return JSON.stringify(responseData);
    return responseData.response_string;
  } catch (error) {
    throw error;
  }
};
