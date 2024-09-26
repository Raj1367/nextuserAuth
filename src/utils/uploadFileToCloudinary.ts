
const url = `https://api.cloudinary.com/v1_1/dm7cbhv2r/auto/upload`


const uploadFile = async (file: any) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append("upload_preset", "chat-app")

    const response = await fetch(url, {
        method: 'post',
        body: formData
    })
    const responseData = await response.json()


    return responseData
}

export default uploadFile