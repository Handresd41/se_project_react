const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`).then(checkResponse);
}

function addItem(item) {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

export { getItems, deleteItem, addItem };
