async function addHotel(url) {
    let name = prompt('Please provide a name for your hotel');
    let location = prompt('Please provide a location for your hotel');

    if (name === null || location === null) {
        return;
    }

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Location: location }), 
    }).then(response => {
        if (response.ok) {
            const resData = 'Created hotel';
            console.log(resData);
            return Promise.resolve(resData);
        }
        return Promise.reject(err)
    }).catch(err => {
        if (err) {
            alert(err.statusText);
        }
    })
}