const baseUrl = "http://localhost:3001";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.text().then((errorText) => {
    console.log("Server error response:", errorText);
    return Promise.reject(`Error: ${response.status} - ${errorText}`);
  });
}

function getItems() {
  return request(`${baseUrl}/items`, {
    method: "GET",
  });
}

function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function addItem(item, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function updateProfile({ name, avatar }, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  });
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export {
  checkResponse,
  getItems,
  deleteItem,
  addItem,
  addCardLike,
  removeCardLike,
  updateProfile,
  request,
  baseUrl,
};
