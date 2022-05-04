import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

const initialState = {};

// Création du slice spotify
export const spotifySlice = createSlice({
    name: 'spotify',
    initialState,
    // Reducers (Synchrone)
    reducers: {
        setAccessToken(state, action) {
            spotify.setAccessToken(action.payload.accessToken);
            state.accessToken = action.payload.accessToken;
        },
        getAccessToken(state) {
            return state.accessToken;
        }
    },
    // ExtraReducers (Asynchrone)
    extraReducers: (builder) => {
        builder
        // Récupération de l'utilisateur
        .addCase(fetchUser.pending, () => {
            console.log("Loading user...");
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addCase(fetchUser.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Récupération des playlists de l'utilisateur
        .addCase(fetchPlaylists.pending, () => {
            console.log("Loading playlists...");
        })
        .addCase(fetchPlaylists.fulfilled, (state, action) => {
            state.playlists = action.payload;
        })
        .addCase(fetchPlaylists.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Récupération d'une playlist
        .addCase(fetchPlaylist.pending, () => {
            console.log("Loading playlist...");
        })
        .addCase(fetchPlaylist.fulfilled, (state, action) => {
            state.playlist = action.payload;
        })
        .addCase(fetchPlaylist.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Récupération des musiques d'une playlist
        .addCase(fetchPlaylistTracks.pending, () => {
            console.log("Loading playlist tracks...");
        })
        .addCase(fetchPlaylistTracks.fulfilled, (state, action) => {
            state.playlist.tracks = action.payload;
        })
        .addCase(fetchPlaylistTracks.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Récupération des titres préférés
        .addCase(fetchMyTopTracks.pending, () => {
            console.log("Loading my top tracks...");
        })
        .addCase(fetchMyTopTracks.fulfilled, (state, action) => {
            state.myTopTracks = action.payload;
        })
        .addCase(fetchMyTopTracks.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Récupération des artistes préférés
        .addCase(fetchMyTopArtists.pending, () => {
            console.log("Loading my top artists...");
        })
        .addCase(fetchMyTopArtists.fulfilled, (state, action) => {
            state.myTopArtists = action.payload;
        })
        .addCase(fetchMyTopArtists.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Récupération des chansons écoutées récemment
        .addCase(fetchMyRecentlyPlayed.pending, () => {
            console.log("Loading my recently played...");
        })
        .addCase(fetchMyRecentlyPlayed.fulfilled, (state, action) => {
            state.myRecentlyPlayed = action.payload;
        })
        .addCase(fetchMyRecentlyPlayed.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Récupération des resultats de recherche
        .addCase(fetchSearchResults.pending, () => {
            console.log("Loading search results...");
        })
        .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.searchResults = action.payload;
        })
        .addCase(fetchSearchResults.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Création de playlist
        .addCase(createPlaylist.pending, () => {
            console.log("Creating playlist...");
        })
        .addCase(createPlaylist.fulfilled, (state, action) => {
            state.playlist = action.payload;
        })
        .addCase(createPlaylist.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Suppresion de playlist
        .addCase(deletePlaylist.pending, () => {
            console.log("Deleting playlist...");
        })
        .addCase(deletePlaylist.fulfilled, (state, action) => {
            state.playlist = action.payload;
        })
        .addCase(deletePlaylist.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Ajout d'une musique à une playlist
        .addCase(addTrackToPlaylist.pending, () => {
            console.log("Adding track to playlist...");
        })
        .addCase(addTrackToPlaylist.fulfilled, (state, action) => {
            state.playlist = action.payload;
        })
        .addCase(addTrackToPlaylist.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
        // Suppression d'une musique dans une playlist
        .addCase(removeTrackFromPlaylist.pending, () => {
            console.log("Removing track from playlist...");
        })
        .addCase(removeTrackFromPlaylist.fulfilled, (state, action) => {
            state.playlist = action.payload;
        })
        .addCase(removeTrackFromPlaylist.rejected, () => {
            console.log("Erreur sur l'appel API");
        })
    ;}
})

// Récupération de l'utilisateur
export const fetchUser = createAsyncThunk(
    'user/fetch',
    async () => {
        const response = await spotify.getMe();
        console.log(response);
        return response;
    }
);

// Récupération des playlists de l'utilisateur
export const fetchPlaylists = createAsyncThunk(
    'playlists/fetch',
    async () => {
        const response = await spotify.getGeneric('https://api.spotify.com/v1/me/playlists')
        console.log(response);
        return response;
    }
);

// Récupération d'une playlist
export const fetchPlaylist = createAsyncThunk(
    'playlist/fetch',
    async (parameters) => {
        const response = await spotify.getPlaylist(parameters.playlist);
        return response;
    }
);

// Récupération des musiques d'une playlist
export const fetchPlaylistTracks = createAsyncThunk(
    'playlistTracks',
    async (parameters) => {
        const response = await spotify.getPlaylistTracks(parameters.playlist, {
            offset: parameters.offsetNumber,
            limit: 100
        });
        console.log(response);
        return response;
    }
);

// Récupération des titres préférés
export const fetchMyTopTracks = createAsyncThunk(
    'myTopTracks/fetch',
    async (parameters) => {
        const response = await spotify.getMyTopTracks({
            offset: parameters.offsetNumber,
            limit: 50,
            time_range: 'short_term'
        });
        console.log(response);
        return response;
    }
);

// Récupération des artistes préférés
export const fetchMyTopArtists = createAsyncThunk(
    'myTopArtists/fetch',
    async (parameters) => {
        const response = await spotify.getMyTopArtists({
            offset: parameters.offsetNumber,
            limit: 50,
            time_range: 'short_term'
        });
        console.log(response);
        return response;
    }
);

// Récupération des chansons écoutées récemment
export const fetchMyRecentlyPlayed = createAsyncThunk(
    'recentlyPlayed/fetch',
    async () => {
        const response = await spotify.getMyRecentlyPlayedTracks({
            limit: 50
        });
        console.log(response);
        return response;
    }
);

// Récupération des resultats de recherche
export const fetchSearchResults = createAsyncThunk(
    'search/results',
    async (query) => {
        const response = await spotify.searchTracks(query);
        console.log(query);
        console.log(response);
        return response;
    }
);

// Création de playlist
export const createPlaylist = createAsyncThunk(
    'playlist/create',
    async (parameters) => {
        const response = await spotify.createPlaylist(parameters.userId, {name: parameters.playlistName, description: parameters.playlistDescription});
        console.log(response);
        return response;
    }
);

// Suppression de playlist
export const deletePlaylist = createAsyncThunk(
    'playlist/delete',
    async (playlistId) => {
        const response = await spotify.unfollowPlaylist(playlistId);
        console.log(response);
        return response;
    }
);

// Ajout d'une musique à une playlist
export const addTrackToPlaylist = createAsyncThunk(
    'playlist/addTrack',
    async (parameters) => {
        const response = await spotify.addTracksToPlaylist(parameters.playlistId, parameters.track);
        console.log(response);
        return response;
    }
);

// Suppression d'une musique dans une playlist
export const removeTrackFromPlaylist = createAsyncThunk(
    'playlist/removeTrack',
    async (parameters) => {
        const response = await spotify.removeTracksFromPlaylist(parameters.playlistId, [parameters.trackUri]);
        console.log(response);
        return response;
    }
);

export const { setAccessToken, getAccessToken } = spotifySlice.actions;

export default spotifySlice.reducer;