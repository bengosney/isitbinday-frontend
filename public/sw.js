const fetchAndCache = async () => {
    const response = await fetch('/sw.js');
};

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});
