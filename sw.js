
const SW_VERSION = '2.4';
const SW_ACTIVE = true;
const SW_LOG_PREFIX = 'SW' + SW_VERSION + ' --> ';
const SW_CACHE = 'memory' + SW_VERSION;

const BASEPATH = '/memory2/';
const ITEMSTRING = 'cat dog elephant giraffe hippo kudu monkey panda pig seal squirrel zebra';
const FILES = [
        BASEPATH, 
        BASEPATH + 'app-card.css ',
        BASEPATH + 'app-card.js',
        BASEPATH + 'app-cards.js',
        BASEPATH + 'app-counter.css',
        BASEPATH + 'app-counter.html',
        BASEPATH + 'favicon.ico',
        BASEPATH + 'index.html', 
        BASEPATH + 'launcher-icon.png', 
        BASEPATH + 'launcher-icon-2x.png', 
        BASEPATH + 'launcher-icon-3x.png', 
        BASEPATH + 'launcher-icon-4x.png', 
        BASEPATH + 'main.css',
    ].concat(get_pic_names(ITEMSTRING));

if (SW_ACTIVE) {
    console.log(SW_LOG_PREFIX + 'ServiceWorker active.');

    self.addEventListener('install', event => {
        caches.open(SW_CACHE).then(cache => cache.addAll(FILES));
    });
    self.addEventListener('activate', event => {
        console.log(SW_LOG_PREFIX + 'ServiceWorker activate.');
    });
    self.addEventListener('fetch', event => {
        event.respondWith(caches.match(event.request));
    });
} else {
    console.log(SW_LOG_PREFIX + 'ServiceWorker turned OFF.');
}

function get_pic_names(itemstring) {
    const li = itemstring.split(' ');
    let li2 = [];
    for (let i=0; i<li.length; i++) {
        li2.push(BASEPATH + 'pics/' + li[i] + '-1.jpg');
        li2.push(BASEPATH + 'pics/' + li[i] + '-2.jpg');
    }
    return li2;
}