
const SW_ACTIVE = true;
const SW_VERSION = '2.32';

const SW_MV = SW_VERSION.split('.')[0]; // major version number
const SW_LOG_PREFIX = 'SW' + SW_VERSION + ' --> ';
const SW_CACHE = 'memory' + SW_MV;

const BASEPATH = '/memory/' + SW_MV + '/';
const ITEMSTRING = 'cat dog elephant giraffe hippo kudu monkey panda pig seal squirrel zebra';
const FILES = get_pic_names(ITEMSTRING).concat([
        BASEPATH, 
        BASEPATH + '../favicon.ico',

        BASEPATH + 'main.js',
        BASEPATH + 'pubsub.js',

        BASEPATH + 'index.html', 
        BASEPATH + 'app-card.html',
        BASEPATH + 'app-cards.html',
        BASEPATH + 'app-counter.html',
        BASEPATH + 'app-restart.html',

        BASEPATH + 'main.css',
        BASEPATH + 'app-card.css',
        BASEPATH + 'app-counter.css',

        BASEPATH + 'launcher-icon.png', 
        BASEPATH + 'launcher-icon-2x.png', 
        BASEPATH + 'launcher-icon-3x.png', 
        BASEPATH + 'launcher-icon-4x.png', 
    ]);

if (SW_ACTIVE) {
    console.log(SW_LOG_PREFIX + 'ServiceWorker is ON.');

    self.addEventListener('install', event => {
        console.log(SW_LOG_PREFIX + 'ServiceWorker install event.');

        // Delete all existing files from cache, then add new files.
        event.waitUntil(
            caches.open(SW_CACHE).then(cache => {
                cache.keys().then(keys => {
                    keys.forEach(req => cache.delete(req));
                }).then(() => {
                    cache.addAll(FILES);
                });
            })
        );

        self.skipWaiting();
    });

    self.addEventListener('activate', event => {
        console.log(SW_LOG_PREFIX + 'ServiceWorker activate event.');
    });

    self.addEventListener('fetch', event => {
        event.respondWith(caches.match(event.request) || fetch(event.request));
    });

} else {
    console.log(SW_LOG_PREFIX + 'ServiceWorker is OFF.');
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