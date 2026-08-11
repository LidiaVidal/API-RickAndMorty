
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

async function resultadoAPI() {
    const respostaAPI = await pegarDados(API_URL)
    const personagens = respostaAPI.results
    return personagens
}

const dadosPersonagens = await resultadoAPI()
const tagMain = document.querySelector('#lista-personagens')

//Dicionario
const traduzStatus = {
    'Alive': 'Vivo',
    'Dead': 'Morto',
    'unknown': 'Desconhecido'
}

const traduzEspecie = {
    'Human': 'Humano',
    'Alien': 'Alienígena'
}

const tradutorLocais = {
    'citadel of ricks': 'Cidadela dos Ricks',
    'earth (c-137)': 'Terra (C-137)',
    'earth (replacement dimension)': 'Terra (Dimensão de Substituição)',
    'anatomy park': 'Parque da Anatomia',
    'interdimensional cable': 'Cabo Interdimensional',
    "worldender's lair": 'Guarida do Devastador de Mundos',
    'testicle monster dimension': 'Dimensão do Monstro Testículo',
    'unknown': 'Desconhecido'
}

//DOM
function criaCards(dadosAPI) {
    //console.log('funcao api: ', dadosAPI)
    dadosAPI.forEach((personagem, indice) => {
        const article = document.createElement('article')
        article.classList.add('card-personagem')

        const cabecalho = document.createElement('header')
        cabecalho.classList.add('card-personagem__cabecalho')
        //Dentro do header (Img e h2)

        const imgPersonagem = document.createElement('img')
        imgPersonagem.classList.add('card-personagem__imagem', 'js-imagem')
        imgPersonagem.src = dadosAPI[indice].image

        const nomePersonagem = document.createElement('h2')
        nomePersonagem.classList.add('card-personagem__nome', 'js-nome')
        nomePersonagem.textContent = dadosAPI[indice].name

        const cardInfo = document.createElement('div')
        cardInfo.classList.add('card-personagem__conteudo')
        //Dentro da div (p, dl)

        const paragrafo = document.createElement('p')
        paragrafo.classList.add('card-personagem__status')
        //Dentro do p

        const textOculto = document.createElement('span')
        textOculto.classList.add('texto-oculto')
        textOculto.textContent = 'Status e espécie:'

        const iconeStatus = document.createElement('span')
        iconeStatus.classList.add('icone-status', 'js-icone-status')
        if (dadosAPI[indice].status == 'Alive') {
            iconeStatus.dataset.status = 'alive'
        } else if (dadosAPI[indice].status == 'Dead') {
            iconeStatus.dataset.status = 'dead'
        } else if (dadosAPI[indice].status == 'unknown') {
            iconeStatus.dataset.status = 'unknown'
        }
        
        iconeStatus.ariaHidden = 'true'

        //Adiciona status e especie dinamicamente
        const status = traduzStatus[personagem.status] 
        const especie = traduzEspecie[personagem.species] 
        
        const statusPersonagem = document.createElement('span')
        statusPersonagem.classList.add('js-status-especie')
        statusPersonagem.textContent = `${status} - ${especie}`

        const tagDl = document.createElement('dl')
        tagDl.classList.add('card-personagem__informacoes')

        const divInfoGrupo = document.createElement('div')
        divInfoGrupo.classList.add('info-grupo')

        const infoTermo = document.createElement('dt')
        infoTermo.classList.add('info-termo') 
        infoTermo.textContent = 'Última localização conhecida:'

        //Adiciona os locais dinamicamente
        const local = tradutorLocais[personagem.location.name.toLowerCase()] || personagem.location.name
        const localizacaoPersonagem = document.createElement('dd')
        localizacaoPersonagem.classList.add('info-detalhe', 'js-localizacao')
        localizacaoPersonagem.textContent = local

        tagMain.append(article)
        article.append(cabecalho)
        article.append(cardInfo)
        cabecalho.append(imgPersonagem)
        cabecalho.append(nomePersonagem)
        cardInfo.append(paragrafo)
        cardInfo.append(tagDl)
        paragrafo.append(textOculto)
        paragrafo.append(iconeStatus)
        paragrafo.append(statusPersonagem)
        tagDl.append(divInfoGrupo)
        divInfoGrupo.append(infoTermo)
        divInfoGrupo.append(localizacaoPersonagem)


    });
    

}

criaCards(dadosPersonagens)

//Filtrar
const btnFiltro = document.querySelectorAll('btn-filtro')
const filtroTodos = document.querySelector('#filtro-todos')
const filtroVivos = document.querySelector('#filtro-vivos')
const filtroMortos = document.querySelector('#filtro-mortos')
const filtroDesconhecidos = document.querySelector('#filtro-desconhecidos')

filtroTodos.addEventListener('click', () => {
    tagMain.innerHTML = ''
    criaCards(dadosPersonagens)
    botaoAtivo(filtroTodos)
})

filtroVivos.addEventListener('click', () => {
    filtrar(dadosPersonagens, 'Alive')
    botaoAtivo(filtroVivos)
})

filtroMortos.addEventListener('click', () => {
    filtrar(dadosPersonagens, 'Dead')
    botaoAtivo(filtroMortos)

})

filtroDesconhecidos.addEventListener('click', () => {
    filtrar(dadosPersonagens, 'unknown')
    botaoAtivo(filtroDesconhecidos)
})

function filtrar(dadosAPI, statusEscolhido) {
    const dadosFiltrados = dadosAPI.filter((dados) => {
        return dados.status == statusEscolhido
    })
    tagMain.innerHTML = ''
    criaCards(dadosFiltrados)
}

function botaoAtivo(btnClicado) {
    const btnFiltro = document.querySelectorAll('.btn-filtro')
    btnFiltro.forEach((btn) => {
        btn.ariaPressed = 'false'
    })

    btnClicado.ariaPressed = 'true'
}