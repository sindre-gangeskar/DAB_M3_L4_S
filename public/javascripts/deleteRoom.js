async function deleteRoom(url, roomId) {
    await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: roomId})
    }).then(response => {
        if (response.ok) {
            location.reload();
            return Promise.resolve('Deleted room');
        }
        return Promise.reject(alert(response.statusText))
    }).catch(err => {
        if (err) {
            alert(err.statusText);
        }
    })
}