module.exports = {
    unAuthorized: (res) => {
        res.status(401).json({
            mensaje: 'No autorizado'
        })

    }
}