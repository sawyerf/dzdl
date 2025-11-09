const express = require('express');
const axios = require('axios');
const ws = require('ws');
const cors = require('cors');
const { spawn } = require('child_process');
const TOML = require('smol-toml');
const fs = require('fs');
const PORT = 2130;

const app = express();

const wss = new ws.Server({ noServer: true });
const notifications = []
const clients = [];
const downloadings = new Set();

wss.on('connection', (socket) => {
    console.log('New WebSocket connection established');
    clients.push(socket);

    socket.send(JSON.stringify(notifications))
    socket.on('message', message => console.log(`Received message: ${message}`));
    socket.on('close', () => {
        console.log('WebSocket connection closed')
        clients.splice(clients.indexOf(socket), 1);
    });
});

const addNotification = (message, status) => {
    notifications.push({
        type: 'notification',
        date: new Date().toISOString(),
        status,
        message
    });
    clients.forEach(client => {
        client.send(JSON.stringify({
            type: 'notification',
            date: new Date().toISOString(),
            status,
            message
        }));
    });
}

if (process.env.NODE_ENV !== 'production') app.use(cors());
app.use(express.static('public'));

arl = ''
axios.defaults.headers.common['Cookie'] = `arl=${arl}`;
const RIP_BIN = process.env.RIP_BIN || 'rip';
const CONFIG_FILE = process.env.CONFIG_FILE || '/root/.config/streamrip/config.toml';

// Types possibles
const TYPE_TRACK = 'track';
const TYPE_ALBUM = 'album';
const TYPE_ARTIST = 'artist';
const TYPE_PLAYLIST = 'playlist';

app.get('/search', async (req, res) => {
    const { search, search_type } = req.query;

    if (![TYPE_TRACK, TYPE_ALBUM, TYPE_ARTIST, TYPE_PLAYLIST].includes(search_type)) {
        return res.status(400).json({ error: `Invalid search_type: ${search_type}` });
    }

    const encodedSearch = encodeURIComponent(search);
    let data = [];

    try {
        const resp = await axios.get(`https://api.deezer.com/search/${search_type}?q=${encodedSearch}`);
        data = resp.data.data;
    } catch (error) {
        return res.status(500).json({ error: `Could not search for ${search}: ${error.message}` });
    }

    res.json(data);
});

app.get('/album', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Album ID is required' });
    }

    try {
        const resp = await axios.get(`https://api.deezer.com/album/${id}`);
        return res.json(resp.data);
    } catch (error) {
        return res.status(500).json({ error: `Could not fetch album: ${error.message}` });
    }
});

app.get('/artist', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Artist ID is required' });
    }

    try {
        const resp = await axios.get(`https://api.deezer.com/artist/${id}/albums?limit=150`);
        return res.json(resp.data);
    } catch (error) {
        return res.status(500).json({ error: `Could not fetch artist: ${error.message}` });
    }
});

app.get('/artist-info', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Artist ID is required' });
    }

    try {
        const resp = await axios.get(`https://api.deezer.com/artist/${id}`);
        return res.json(resp.data);
    } catch (error) {
        return res.status(500).json({ error: `Could not fetch artist info: ${error.message}` });
    }
});

app.get('/artist-top', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Artist ID is required' });
    }

    try {
        const resp = await axios.get(`https://api.deezer.com/artist/${id}/top?limit=50`);
        return res.json(resp.data);
    } catch (error) {
        return res.status(500).json({ error: `Could not fetch artist top tracks: ${error.message}` });
    }
});

app.get('/playlist', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Playlist ID is required' });
    }

    try {
        const resp = await axios.get(`https://api.deezer.com/playlist/${id}`);
        return res.json(resp.data);
    } catch (error) {
        return res.status(500).json({ error: `Could not fetch playlist: ${error.message}` });
    }
});

app.get('/download', async (req, res) => {
    const { url, name } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`Starting download for ${url}`);
    if (downloadings.has(url)) {
        addNotification(`Download already in progress for '${name}'`, 'warning');
        return res.status(400).json({ error: `Download already in progress for ${url}` });
    }
    downloadings.add(url);
    addNotification(`Starting download for '${name}'`, 'info');
    const process = spawn(RIP_BIN, ['--no-db', 'url', url], { shell: true });
    const stderr = [];
    process.stdout.on('data', (data) => { });
    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        stderr.push(data.toString());
    });
    process.on('close', (code) => {
        downloadings.delete(url);
        if (code !== 0) {
            // addNotification(`Download failed for ${name}`, 'error');
            addNotification(`Download failed for ${name}: ${stderr.join('')}`, 'error');
            return res.status(500).json({ error: `Could not download file: process exited with code ${code}` });
        }
        addNotification(`Download completed for ${name}`, 'success');
        res.status(200).json({ message: 'Download completed successfully' });
    });
    process.on('error', (error) => {
        // addNotification(`Error downloading ${url}: ${error.message}`, 'error');
        addNotification(`Download failed for ${name}: ${stderr.join('')}`, 'error');
        downloadings.delete(url);
        res.status(500).json({ error: `Could not download file: ${error.message}` });
    });

})

// read /root/.config/streamrip/
// app.get('/config', async (req, res) => {
//     try {
//         const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
//         const config = TOML.parse(data);
//         if (config?.deezer?.arl) config.deezer.arl = ""
//         res.json(config);
//     } catch (error) {
//         res.status(500).json({ error: `Could not read config: ${error.message}` });
//     }
// })

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});