const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 25
const limit = 5
let offset = 0

function loadPokemonItens(offset, limit){
    api.getPokemons(offset, limit).then((pokemons = []) => {
            pokemonList.innerHTML += pokemons.map((pokemon) =>
            `
                <li class="pokemon-card ${pokemon.type}">
                    <span class="number">00${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="pokemon-card__details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                        </ol>
                            
                        <img src="${pokemon.photo}" alt="Imagem do ${pokemon.name}">
                    </div>      
                </li>
            `).join('')
        })
        .catch((error) =>{console.log(error)})
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', ()=>{
    offset += limit

    const qtdRecordNextPage = offset + limit 

    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})
