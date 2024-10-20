const ping = (req, res) => {
    console.log("pinged")
    res.status(200).send("Pinged");
}

module.exports = {ping}