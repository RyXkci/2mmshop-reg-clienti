const findMatch = (client, clothing) => {
    const matchesSex = client.sex === clothing.sex;
    const matchesType = clothing.type in client.sizes; // Ensure type matches one of the client's sizes
    const matchesSize = client.sizes[clothing.type] === clothing.size;

}

module.exports = {findMatch}