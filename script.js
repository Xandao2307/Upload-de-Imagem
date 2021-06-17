const CLIENT_ID = "e757b6ca3c7b789"
        const form = document.getElementById('upload-form')
        const gallery = document.getElementById("gallery")


        const doUpload = (url, options) => {
            const promiseCallback = (resolve, reject) => {
                fetch(url, options)
                    .then(response => response.json())
                    .then(resolve)
                    .catch(reject)
            }
            return new Promise(promiseCallback)
        }

        const addImage = (url) => {
            gallery.innerHTML = `<img src="${url}">`
        }

        const onSuccess = (result) => {
            const { data: { link } } = result
            addImage(link)
            console.log('link', link)
        }

        const uploadImage = (e) => {
            e.preventDefault()
            console.log('Imagem sendo uploadada')

            const file = document.getElementById('file')

            const data = new FormData()
            data.append('image', file.files[0])

            doUpload('https://api.imgur.com/3/image/', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Client-ID ${CLIENT_ID}`,

                }
            })
                .then(onSuccess)
                .catch(console.error)
        }

        form.addEventListener('submit', uploadImage)
        console.log('Upload', form)
