const ping = (req, res) => {
    res.status(200).send("Pinged");
}

module.exports = {ping}