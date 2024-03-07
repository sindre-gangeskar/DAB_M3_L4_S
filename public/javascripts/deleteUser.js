async function deleteUser(url, userId) {
    await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: userId})
    }).then(response => {
        if (response.ok) {
            const resData = 'User deleted';
            location.reload();
            return Promise.resolve(resData);
        }
        return Promise.reject(alert(response));
    }).catch(err => {
        if (err) {
            alert(err.statusText);
        }
    })
}