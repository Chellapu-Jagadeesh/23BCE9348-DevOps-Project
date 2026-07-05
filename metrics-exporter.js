const net = require('net');
const GRAPHITE_HOST = 'graphite';
const GRAPHITE_PORT = 2003;
function sendMetric(path, value) {
    const timestamp = Math.floor(Date.now() / 1000);
    const message = `tourism.website.${path} ${value} ${timestamp}\n`;
    const client = new net.Socket();
    client.connect(GRAPHITE_PORT, GRAPHITE_HOST, () => {
        client.write(message);
        client.destroy();
        console.log(`OK: ${path} = ${value}`);
    });
    client.on('error', (err) => {
        console.error(`ERR: ${err.message}`);
    });
    client.setTimeout(3000, () => {
        console.error('TIMEOUT');
        client.destroy();
    });
}
function collectAndSendMetrics() {
    const mem = process.memoryUsage();
    sendMetric('memory.heap_used', mem.heapUsed);
    sendMetric('memory.heap_total', mem.heapTotal);
    sendMetric('memory.rss', mem.rss);
    sendMetric('uptime_seconds', Math.floor(process.uptime()));
    sendMetric('users.active', Math.floor(Math.random() * 1000) + 500);
    sendMetric('page_views', Math.floor(Math.random() * 5000) + 2000);
    sendMetric('response_time_ms', (Math.random() * 200 + 50).toFixed(2));
    sendMetric('bookings_per_minute', Math.floor(Math.random() * 20) + 5);
    sendMetric('error_rate', (Math.random() * 2).toFixed(2));
}
console.log('Metrics exporter starting...');
console.log('Target: ' + GRAPHITE_HOST + ':' + GRAPHITE_PORT);
collectAndSendMetrics();
setInterval(collectAndSendMetrics, 10000);
