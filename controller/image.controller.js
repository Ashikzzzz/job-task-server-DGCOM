//  image controller -------------------------------
exports.getImage = async(req, res)=>{
    try {
        const image = await getImageServices()
        res.status(200).json({
            status: 'success',
            data: image
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: error.message
        })
    }
}