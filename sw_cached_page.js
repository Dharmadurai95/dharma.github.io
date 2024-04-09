const cacheStoreName = 'v2'
const cacheAsset = [
    "./about.html",
    "./home.html",
    "./style.css",
    "./js/main.js"
]
//install events
self.addEventListener("install", (e) => {
    console.log("Service worker installed")
    e.waitUntil(
        caches.open(cacheStoreName).then((caches) => {
            caches.addAll(cacheAsset)
        }).then(() => self.skipWaiting())
    )
})
//acitivate
self.addEventListener("activate", (e) => {
    console.log("Service worker activated", e)
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            Promise.all(cacheNames.filter((eachCacheName) => {
                if (eachCacheName != cacheStoreName) return caches.delete(eachCacheName)
            }))
        })
    )
})

//call fetch event
self.addEventListener("fetch",e=>{
    console.log("fetch event")
    e.respondWith(fetch(e.request).catch(()=> caches.match(e.request)))
})