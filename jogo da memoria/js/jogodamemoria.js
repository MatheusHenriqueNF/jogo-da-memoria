const grid = document.querySelector('.grid');
const spanJogador = document.querySelector('.jogador');
const timer = document.querySelector('.timer');

/*array para armazenar as cartas do jogo*/
const personagens = [
    'franchesco',
    'carros',
    'carroroxo',
    'corredornovo',
    'colheitadeira',
    'doc',
    'martin',
    'mcquen',
    'trator',
    'carroamarelo',
];

/*

criada uma função onde ela cria as divs

e depois atribuidas dentro do elemento pai, criando uma hierarquia

 */

const createElement = (tag, className) =>{
    const elemento = document.createElement(tag);
    elemento.className = className;
    return elemento;
}

let primeiraCarta = '';
let segundaCarta = '';

const checarFimJogo = () =>{
    const disabledCartas = document.querySelectorAll('.disabled-carta');

    if(disabledCartas.length == 20){
        clearInterval(this.loop);
        alert('Parabens');
    }
}

const checarCartas = () =>{
    const primeiroPersonagem = primeiraCarta.getAttribute('data-personagem');
    const segundoPersonagem = segundaCarta.getAttribute('data-personagem');

    if(primeiroPersonagem == segundoPersonagem){

        primeiraCarta.firstChild.classList.add('disabled-carta');
        segundaCarta.firstChild.classList.add('disabled-carta');

        primeiraCarta = '';
        segundaCarta = '';

        checarFimJogo();

    }else{

        setTimeout(() =>{
            primeiraCarta.classList.remove('review-carta');
            segundaCarta.classList.remove('review-carta');

            primeiraCarta = '';
            segundaCarta = '';
        },500);


    }
}

const reviewCarta = ({target}) => {

    if(target.parentNode.className.includes('review-carta')){
        return;
    }

/*verificando se a carta já foi clicada*/

    if(primeiraCarta == ''){
        target.parentNode.classList.add('review-carta');
        primeiraCarta = target.parentNode;
    } else if(segundaCarta == ''){
        target.parentNode.classList.add('review-carta');
        segundaCarta = target.parentNode;

        checarCartas();
    }

}

const criarCarta = (personagens) => {

    const carta = createElement('div', 'cartas'); /*criar carta com tag*/
    const frente = createElement('div', 'face frente');
    const verso = createElement('div', 'face verso');


    frente.style.backgroundImage = `url('../img/${personagens}.png')`;
    carta.appendChild(frente);
    carta.appendChild(verso);

    carta.addEventListener('click', reviewCarta);
    carta.setAttribute('data-personagem', personagens);

    return carta;

}

/* criar as cartas do jogo com as imagens do array*/
const carregarJogo = () => {

    const duplicarPersonagem = [ ...personagens, ...personagens]; /* duplicação das cartas*/


    const sortearArray = duplicarPersonagem.sort( () => Math.random() - 0.5 ); /*sorteador da ordem das cartas*/


    duplicarPersonagem.forEach((personagem_do_jogo) =>{ /*percorre toda a variavel criando a mesma carta duas vezes */

        const pers_array = criarCarta(personagem_do_jogo);
        grid.appendChild(pers_array);

    });
}

/*tempo de jogo*/
const startTimer = () => {
    this.loop = setInterval(() => {

        const tempoAtual = +timer.innerHTML;
        timer.innerHTML = tempoAtual + 1;

    }, 1000);
}

/*executar depois de totalmente carregada*/
window.onload = () => {

 
    /*defindo o nome do jogador*/
    spanJogador.innerHTML = localStorage.getItem('player');
    startTimer();
    carregarJogo();
}

