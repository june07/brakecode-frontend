self.addEventListener('fetch', event => {
    // Intercept the fetch event to handle URL sharing
    if (event.request.method === 'POST' && event.request.url.includes('/wap')) {
        event.respondWith(handleShareUrl(event.request))
    }
})

async function handleShareUrl(request) {
    const formData = await request.formData()
    const title = formData.get('title')
    const text = formData.get('text')
    const url = formData.get('url')
    const files = formData.getAll('media') // Get all file objects

    // Store files temporarily in IndexedDB (optional, for larger files)
    const fileArray = []
    for (const file of files) {
        const fileData = {
            name: file.name,
            type: file.type,
            blob: await file.arrayBuffer() // Convert to ArrayBuffer
        }
        fileArray.push(fileData)
    }

    // Redirect to the Vue "/share/" page
    const redirectUrl = new URL(`/wap?upload=1#share&title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, self.location.origin)
    const redirectResponse = new Response(redirectUrl.href, { status: 303, headers: { 'Location': redirectUrl.href } })

    self.addEventListener('message', (event) => {
        if (event.data === 'READY_FOR_SHARE') {
            event.source.postMessage({ type: 'SHARED_FILES', title, text, url, files: fileArray })
        }
    })

    return redirectResponse
}