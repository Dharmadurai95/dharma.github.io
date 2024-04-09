if ('serviceWorker' in navigator) {
    console.log("Service worker Support");
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw_cached_side.js').then((reg) => {
            console.log("Service worker registered")
        }).catch((e)=>{
            console.log(`Service Worker error: ${e}`)
        })
    })
}