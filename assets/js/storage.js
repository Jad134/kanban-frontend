const STORAGE_TOKEN = 'I6UE37M81WPHG1CYOP17O5XNIFP9VCIPG0GVDZE8';
const URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Sets an item in the storage using the provided key and value.
 * @param {string} key - The key for the item in the storage.
 * @param {any} value - The value to be stored.
 * @returns {Promise<any>} A Promise that resolves to the result from setting the item.
 */
async function setItem(key, value){
    const payload = {key, value, token: STORAGE_TOKEN}
    return fetch(URL, { method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}


/**
 * Retrieves an item from the storage using the given key.
 * @param {string} key - The key for the item in the storage.
 * @returns {Promise<any>} A Promise that resolves to the retrieved item.
 */
async function getItem(key) {
    const url =`${URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}
