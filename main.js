
if ('serviceWorker' in navigator) {

    navigator.serviceWorker.addEventListener('controllerchange', function (event) {
        console.log('ServiceWorker changed, page will reload...');
        window.location.reload();
        console.log('Page reload done.');
    });

    navigator.serviceWorker.register('/memory/2/sw.js', { scope: '/memory/2/' }).then(function(reg) {
        console.log('ServiceWorker running...');
    }).catch(function(err) {
        console.error('ServiceWorker installation error:', err);
    });

} else {

    console.log('Browser does not support ServiceWorker.');

}

