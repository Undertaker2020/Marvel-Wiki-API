class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKay = 'apikey=43c3edf5f5a65cb8797b98a975b8c8ad';
    _baseOffset = 210;

    getResource = async (url) => {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKay}`);
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKay}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
}

export default MarvelService;