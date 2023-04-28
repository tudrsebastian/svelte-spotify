import { fetchRefresh } from "$helpers";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load:PageLoad= async ({fetch: _fetch, params,depends,route,url}) =>{
    depends(`app: ${route.id}`)
    const fetch =(path:string) => fetchRefresh(_fetch,path);

    const limit = 100;
    const page = url.searchParams.get('page');

    const playlistRes = await fetch(`/api/spotify/playlists/${params.id}`);

    if(!playlistRes.ok){
        throw error(playlistRes.status, 'Failed to load playlist')
    }

    const playlistResJSON: SpotifyApi.SinglePlaylistResponse = await playlistRes.json();

    if(page && page !== '1'){
        const tracksRes = await fetch(`/api/spotify/playlists/${params.id}/tracks?${new URLSearchParams({
            limit: `${limit}`,
            offset: `${limit *  (Number(page) - 1)}`
        }).toString()}`)
        
        if(!tracksRes.ok){
            throw error(tracksRes.status, 'Failed to load playlist')
        }
        const tracksResJSON = await tracksRes.json();

        playlistResJSON.tracks = tracksResJSON;
    }
    let color = null;

    if(playlistResJSON.images.length > 0){
        const  colorRes = await fetch(`/api/average-color?${new URLSearchParams({
            image: playlistResJSON.images[0].url
        }).toString()}`)

        if(colorRes.ok){
        color = (await colorRes.json()).color;
        }
    }
    return {
        playlist: playlistResJSON,
        color,
        title: playlistResJSON.name
    }
}