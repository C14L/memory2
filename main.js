
// ShadowDOM Polyfills, see:
// https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom

const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;

function loadScript(src) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Lazy load the polyfill if necessary.
if (!supportsShadowDOMV1) {
    loadScript('./bower_components/shadydom/shadydom.min.js')
    .then(e => loadScript('./bower_components/shadycss/shadycss.min.js'))
    .then(e => {
        // Polyfills loaded.
    });
} else {
    // Native shadow dom v1 support. Go to go!
}

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

