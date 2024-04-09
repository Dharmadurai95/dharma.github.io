const cacheStoreName = 'v2'

//install events
self.addEventListener("install", (e) => {
    console.log("Service worker installed")
    // e.waitUntil(
    //     caches.open(cacheStoreName).then((caches) => {
    //         caches.addAll(cacheAsset)
    //     }).then(() => self.skipWaiting())
    // )
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
self.addEventListener("fetch", e => {
    console.log("fetch event")
    // e.respondWith(fetch(e.request).catch(()=> caches.match(e.request)))
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                if (!res || res.status !== 200 || res.type !== "basic") {
                    return res;
                }

                const cloneData = res.clone();
                caches.open(cacheStoreName).then((cache) => { cache.put(e.request, cloneData) });
                return res;
            }).catch(() => caches.match(e.request).then((res) => res))
    )
})

// self.addEventListener("fetch", e => {
//     console.log("fetch event");
//     e.respondWith(
//         fetch(e.request)
//             .then(res => {
//                 // Check if response is valid
//                 if (!res || res.status !== 200 || res.type !== "basic") {
//                     return res;
//                 }

//                 const responseToCache = res.clone();

//                 caches.open(cacheStoreName)
//                     .then(cache => {
//                         cache.put(e.request, responseToCache);
//                     });

//                 return res;
//             })
//             .catch(() => {
//                 return caches.match(e.request);
//             })
//     );
// });
