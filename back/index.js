const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());

arl = ''
axios.defaults.headers.common['Cookie'] = `arl=${arl}`;

// Types possibles
const TYPE_TRACK = 'track';
const TYPE_ALBUM = 'album';
const TYPE_ARTIST = 'artist';

app.get('/search', async (req, res) => {
    const { search, search_type } = req.query;

    if (![TYPE_TRACK, TYPE_ALBUM, TYPE_ARTIST].includes(search_type)) {
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
        const resp = await axios.get(`https://api.deezer.com/artist/${id}/albums`);
        return res.json(resp.data);
    } catch (error) {
        return res.status(500).json({ error: `Could not fetch artist: ${error.message}` });
    }
});

app.get('/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        console.log(`Downloading file from URL: ${url}`);
        return res.status(200).json({ message: 'File download initiated' });
    } catch (error) {
        return res.status(500).json({ error: `Could not download file: ${error.message}` });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});