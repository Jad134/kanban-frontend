const STORAGE_TOKEN = 'I6UE37M81WPHG1CYOP17O5XNIFP9VCIPG0GVDZE8';
const URL = 'https://remote-storage.developerakademie.org/item';
const apiURL = 'http://127.0.0.1:8000/tasks/'

async function getApiItem() {
    return fetch(apiURL)
        .then(res => res.json());
       
}


async function updateTask(id, updatedTaskData) {
    const response = await fetch(`${apiURL}${id}/`, {
        method: 'PATCH',  // Verwende PATCH für partielles Update
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTaskData)
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return await response.json();
}


async function updateSubtasks(taskId, subtasks) {
    const response = await fetch(`${apiURL}${taskId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subtasks: subtasks })
    });

    if (!response.ok) {
        throw new Error('Failed to update subtasks');
    }

    return await response.json();
}

async function updateBucket(taskId, bucket) {
    const response = await fetch(`${apiURL}${taskId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bucket: bucket })
    });

    if (!response.ok) {
        throw new Error('Failed to update subtasks');
    }

    return await response.json();
}


/**
 * Sets an item in the storage using the provided key and value.
 * @param {string} key - The key for the item in the storage.
 * @param {any} value - The value to be stored.
 * @returns {Promise<any>} A Promise that resolves to the result from setting the item.
 */
// async function setItem(key, value){
//     const payload = {key, value, token: STORAGE_TOKEN}
//     return fetch(URL, { method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
// }


/**
 * Retrieves an item from the storage using the given key.
 * @param {string} key - The key for the item in the storage.
 * @returns {Promise<any>} A Promise that resolves to the retrieved item.
 */
// async function getItem(key) {
//     const url =`${URL}?key=${key}&token=${STORAGE_TOKEN}`;
//     return fetch(url).then(res => res.json());
// }
