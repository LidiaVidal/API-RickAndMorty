const API_URL = 'https://rickandmortyapi.com/api/character'

/*function pegarDados(api) {
    const rickMortyAPI = fetch(api)
    .then((res) => res.json())
    .then((dados) => {
        console.log(dados)
    })
    return rickMortyAPI
}

pegarDados(API_URL)
*/

async function pegarDados(url) {
    try {
        const rickMortyAPI = await fetch(url)
        let dados = await rickMortyAPI.json()
        //console.log(dados)
        return dados
    } catch (erro) {
        console.error('Erro: ', erro)
    } finally {
        console.log('Tentativa de requisição concluida')
    }
}

async function app() {
    const respostaAPI = await pegarDados(API_URL)
    const personagens = respostaAPI.results

    const humanos = personagens.filter((personagem) => {
        return personagem.species == 'Human'
    })
    console.log('Esses são apenas os humanos:', humanos)
}

app()