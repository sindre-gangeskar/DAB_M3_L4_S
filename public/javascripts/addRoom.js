async function addRoom(url, hotelId) {
    let capacity = prompt('Please enter the capacity for this room');
    let price = prompt('What is the price per day for this room?');

    if (capacity === null || price === null)
        return;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Capacity: capacity,
            PricePerDay: price,
            HotelId: hotelId
        })
    }).then(response => {
        if (response.ok) {
            let resData = 'Made room';
            alert(resData);
            location.reload();
            return Promise.resolve(resData);

        }
        return Promise.reject(new Error(response));
    }).catch(err => {
        alert(err.statusText);
    })
}