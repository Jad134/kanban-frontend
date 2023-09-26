const STORAGE_TOKEN = 'I6UE37M81WPHG1CYOP17O5XNIFP9VCIPG0GVDZE8';
const URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value){
    const payload = {key, value, token: STORAGE_TOKEN}
    return fetch(URL, { method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getItem(key) {
    const url =`${URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}
