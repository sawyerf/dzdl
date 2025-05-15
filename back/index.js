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
const TYPE_ALBUM_TRACK = 'album_track';
const TYPE_ARTIST_ALBUM = 'artist_album';

// Exemple de fonction pour get_song_infos_from_deezer_website — à adapter selon ton code original
async function getSongInfosFromDeezerWebsite(type, search) {
    // Simule la récupération d'infos via scraping ou autre méthode personnalisée
    // À implémenter selon ton besoin spécifique
    return []; // Placeholder
}

app.get('/search', async (req, res) => {
    const { search, search_type } = req.query;

    if (![TYPE_TRACK, TYPE_ALBUM, TYPE_ARTIST, TYPE_ALBUM_TRACK, TYPE_ARTIST_ALBUM].includes(search_type)) {
        return res.status(400).json({ error: `Invalid search_type: ${search_type}` });
    }

    const encodedSearch = encodeURIComponent(search);
    let data = [];

    try {
        if (search_type === TYPE_ALBUM_TRACK) {
            data = await getSongInfosFromDeezerWebsite(TYPE_ALBUM, encodedSearch);
        } else if (search_type === TYPE_ARTIST_ALBUM) {
            const resp = await axios.get(`https://api.deezer.com/artist/${encodedSearch}/albums`);
            data = resp.data.data;
        } else {
            const resp = await axios.get(`https://api.deezer.com/search/${search_type}?q=${encodedSearch}`);
            data = resp.data.data;
        }
    } catch (error) {
        return res.status(500).json({ error: `Could not search for ${search}: ${error.message}` });
    }

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});