/* const STORAGE_TOKEN = 'I6UE37M81WPHG1CYOP17O5XNIFP9VCIPG0GVDZE8';
const URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value){
    const payload = {key, value, token: STORAGE_TOKEN}
    return fetch(URL, { method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getItem(key) {
    const url =`${URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
} */


/* Eventuell doch zusätzliche Unterverzeichnisse möglich?
 */

const STORAGE_TOKEN = 'FCV9HRWHO0ST2Y3QJEZV2LE1BXIKVABPCCVUMM82';
const BASE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value, subdirectory) {
    const storageURL = `${BASE_URL}/${subdirectory}/${key}?token=${STORAGE_TOKEN}`;
    const payload = { value };

    return fetch(storageURL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

/* 
await setItem('mein-key', 'mein-wert', 'mein-unterverzeichnis');
Die obige Anfrage würde die Daten in https://remote-storage.developerakademie.org/mein-unterverzeichnis/mein-key speichern.*/



