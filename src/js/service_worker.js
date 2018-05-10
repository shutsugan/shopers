'use strict';

if ('serviceWorker' in navigator) {
    addEventListener('load', function () {
        navigator.serviceWorker.register(
            '/sw.js', { scope: '.' }
        );
    });
}

if (navigator.onLine) addEventListener('online', _ => document.body.classList.remove('offline'));
else appOffline();

addEventListener('offline', _ => appOffline());
addEventListener('online', _ => document.body.classList.remove('offline'));

function appOffline() {
    document.body.classList.add('offline');
    Array.from(document.querySelectorAll('a')).forEach(link => {
        linkIsAvailableOffline(link).then(res => {
            if (res) link.classList.add('cached');
        });
    });
}

function linkIsAvailableOffline(link) {
    const url = link.href;
    console.log(url);
    return caches.match(url)
        .then(res => {
            if (res) {
                if (res.status === 200) return true;
            }
        });
}
