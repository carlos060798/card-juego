// se minimisa el archivo con  https://www.toptal.com/developers/javascript-minifier

const mimodulo=(() => {
  'use strict';
  // se agrega la libreria  Underscore.js

  //variables de dom
    const btnpedir = document.getElementById('pedir'),
    btndeterner = document.getElementById('detener'),
    divcartas=document.querySelectorAll('.divcartas'),
    btnnuevo = document.getElementById('nuevo'),  
    contador = document.querySelectorAll('small');
  
  //variables globales de la funcion
  let maso = [],
  puntosjugadores=[];
  const tiposcartas = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

//inicializadores
const iniciarjuego=(numerojugadores=2)=>{
  maso = crearmaso()
  puntosjugadores=[];
for(let i=0; i<numerojugadores; i++){
   puntosjugadores.push(0)
}
contador.forEach(elem => elem.innerText= 0)
divcartas.forEach(ele=> ele.innerText= '')
btnpedir.disabled = false
btndeterner.disabled = false
}
// funciones 
 
  const crearmaso = () => {  //crea carra
    let maso=[]
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tiposcartas) {
        maso.push(i + tipo)
      }

    }
    for (let tipo of tiposcartas) {
      for (let esp of especiales)
        maso.push(esp + tipo)
    }
    return _.shuffle(maso);// devuelve los elementos de un array aletoriamente
  }

// para pedir un elemento del array maso
  const pedircarta = () => {  // recibe el arreglo de cartas y va estrayendo una carta

    if (maso.length === 0) {
      throw 'no hay mas cartas'
    }
    return maso.pop()
  }



  const valorcarta = (carta) => {
    // CON OPERADOR TERNARIO
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
      (valor === 'A') ? 11 : 10
      : valor * 1;
  }


const acumularPuntos = ( carta, turno ) => {
  puntosjugadores[turno] = puntosjugadores[turno] + valorcarta( carta );
  contador[turno].innerText = puntosjugadores[turno];
  return puntosjugadores[turno];
}
const crearcarta=(carta,turno)=>{
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
  imgCarta.classList.add('carta');
  divcartas[turno].append( imgCarta );
} 

const ganador = ()=>{
  const [puntosMinimos,puntosComputadora]=puntosjugadores;
  setTimeout(() => {

    if (puntosComputadora === puntosMinimos) {
      alert('Nadie gana :(');
    } else if (puntosMinimos > 21) {
      alert('Computadora gana')
    } else if (puntosComputadora > 21) {
      alert('Jugador Gana');
    } else {
      alert('Computadora Gana')
    }
  }, 100);
}

// turno computadora
const turnoComputadora = (puntosMinimos) => {
let puntosComputadora=0;
    do {
      const carta = pedircarta();
      puntosComputadora=acumularPuntos(carta,puntosjugadores.length - 1)      
      crearcarta(carta,puntosjugadores.length - 1)   

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    ganador();
  }

  //eventos de eventos

  btnpedir.addEventListener('click', () => {  //turno jugador

    const carta = pedircarta();
    const puntosjugador=acumularPuntos(carta , 0);
    crearcarta(carta,0) // 0 por ser el primer jugador
    if (puntosjugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnpedir.disabled   = true;
        btndeterner.disabled = true;
      
      turnoComputadora(puntosjugador)  // se  llama la funcion para dar el turno ala computadora

    } else if (puntosjugador === 21) {
        btnpedir.disabled   = true;
        btndeterner.disabled = true;
      turnoComputadora(puntosjugador)
    }

  })

  btndeterner.addEventListener('click', () => {
    btnpedir.disabled = true
    btndeterner.disabled = true
    turnoComputadora( puntosjugadores[0])
  })
  // pruba
  btnnuevo.addEventListener('click', () => {
    iniciarjuego()

  });

return{
 inicio: iniciarjuego
}
})();


