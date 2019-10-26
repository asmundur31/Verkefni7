/**
 * Verkefni 7 – Gisk leikur
 *
 * Leikur sem snýst um að giska á tölu milli 0 og 100
 */


/**
 * Global fylki sem geymir fjölda ágiskana í leikjum
 * Ef fylki er tómt hefur enginn leikur verið spilaður.
 * Ef fylki er [2, 3] hafa verið spilaðir tveir leikir þar sem:
 *  - Fyrsti leikur kláraðist í tveim ágiskunum.
 *  - Seinni leikur kláraðist í þrem ágiskunum.
 */

 const games = [];


 /**
  * Byrjar leikinn okkar með því að kalla í play().
  * Eftir að play() klárar þá er boðið notandanum að spila annann leik með confirm()
  * Ef notandi ýtir á "ok" þá er annar leikur spilaður.
  * Ef notandi ýtir á "cancel" þá er sótt niðurstöður með getResults() og þær birtar með alert().
  */
function start() {
  if(play()) {
    while(confirm('Viltu spila annan leik?')){
      if(!play()) break;
    }
  }
  alert(getResults());
}

/**
 * Spilar einn leik. Sér um að:
 *  - Velja tölu af handahófi í byrjun með randomNumber()
 *  - Biðja notanda um tölu með prompt()
 *  - Vinna úr intaki frá notanda með parseGuess()
 *  - Láta vita hversu nálægt eða rétt gisk er með getResponse() og alert()
 *  - Haldautan um fjölda ágiskana
 *  - Vista fjölda ágiskana í "games" fylki þegar búið er að giska rétt
 * 
 * Ef notandi ýtir á cancel þegar beðið er um ágiskun skal hætta í leik en ekki vista ágiskanir
 *  - t.d. með því að nota break í lykkju.
 * 
 * Þarf aðútfæra með lykkju og flæðisstýringum
 * play() skilar true ef leikur kláraðist annars false
 */
function play() {
  const min = 0;
  const max = 100;
  const random = randomNumber(min,max);
  var gisk;
  var count = 0;
  while(gisk !== random){
    gisk = prompt('Giskaðu á tölu milli '+min+' og '+max+'.');
    if(gisk === null) return false;
    if(parseGuess(gisk) === null){
      alert("Ekki tala!\nÞetta telst sem ágískun í refsingu!");
      count++;
    }
    else if(gisk === ''){
      alert('Vinsamlegast sláðu inn tölu!');
    }
    else {
      gisk = parseGuess(gisk);
      count++;
      alert(getResponse(gisk,random));
    }
  }
  games.push(count);
  return true;
}

/**
 * Skilar niðurstöðum um spilaða leiki sem streng.
 * Fjöldi leikja er skilað ásamt meðalfjölda giska, t.d.:
 *    "þú spilaðir 10 leiki
 *     Meðalfjöldi ágiskana var 5"
 * ATH að meðalfjöldi kemur í nýrri línu.
 * Ef enginn leikur var spilaður er skilað:
 *    "Þú spilaðir engann leik >_<"
 */
function getResults(){
  var resault;
  if(games.length%10 == 1 && games.length%100 != 11){
    resault = 'Þú spilaðir '+games.length+' leik.\nMeðalfjöldi ágiskana var '+calculateAverage()+'.';
  }
  else{
    resault = 'Þú spilaðir '+games.length+' leiki.\nMeðalfjöldi ágiskana var '+calculateAverage()+'.';
  }
  return resault;
}

/**
 * Reiknar út og skilar meðal ágiskunum í öllum leikjum sem geymdir eru í 
 * global breytu "games". Skilar gildi með tveim aukastöfum.
 * Ef games = [3,3,4] er niðurstaðan (3+3+4)/3 = 3.66666667
 * og henni skilað sem 3.67
 * 
 * þarf að útfæra með lykkju.
 */
function calculateAverage(){
  var avg = 0;
  if(games.length === 0) return 0;
  for(let i = 0; i < games.length; i++){
    avg += games[i];
  }
  return (avg/games.length).toFixed(2);
}

/**
 * tekur in input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er skilað null
 */
function parseGuess(input){
  if(!isNaN(input)) return parseInt(input, 10);
  return null;
}

/**
 * Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
 *  - guess sem tölu, ágiskun notanda
 *  - correct sem tölu, rétt gildi
 * Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
 * Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
 * Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
 * Ef munur er undir 10 skal skila "Nálægt"
 * Ef munur er undir 20 skal skila "Frekar langt frá"
 * Ef munur er undir 50 skal skila "Langt frá"
 * Annars skal skila "Mjög langt frá"
 * 
 * Þarf að útfæra með flæðistýringu.
 * Math.abs skilar algildi tölu: |a| = Math.abs(a)
 */
function getResponse(guess, correct){
  if(guess === correct) return 'Rétt';
  if(Math.abs(guess-correct)<5) return 'Mög nálægt';
  if(Math.abs(guess-correct)<10) return 'Nálægt';
  if(Math.abs(guess-correct)<20) return 'Frekar langt frá';
  if(Math.abs(guess-correct)<50) return 'Langt frá';
  return 'Mjög langt frá';
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();
