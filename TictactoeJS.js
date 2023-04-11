const TicTacToeFeld_Klasse = "TicTacToeFeld"; 
const TicTacToeSpielfeld_Klasse = "TicTacToeSpielfeld";
const WerDrannIst_Klasse = "WerDrannIst";
const Kreis_Klasse = "Kreis";
const Kreuz_Klasse = "Kreuz";

const OVERLAY_BUTTON_KLASSE = "overlay-button";
const SICHTBAR_KLASSE = "sichtbar";
const OVERLAY_TEXT_KLASSE = "overlay-text";
const OVERLAY_KLASSE = "overlay";

const overlayButton = document.querySelector("." + OVERLAY_BUTTON_KLASSE); 
const overlay = document.querySelector("." + OVERLAY_KLASSE);
const overlayText = document.querySelector("." + OVERLAY_TEXT_KLASSE);


const TicTacToeFelder = document.querySelectorAll("." + TicTacToeFeld_Klasse); 
const TicTacToeSpielfeld = document.querySelector(
  "." + TicTacToeSpielfeld_Klasse
  );
const WerDrannIst = document.querySelector("." + WerDrannIst_Klasse);

const Sieg_Möglichkeiten = [
    [TicTacToeFelder[0], TicTacToeFelder[1], TicTacToeFelder[2]],
    [TicTacToeFelder[3], TicTacToeFelder[4], TicTacToeFelder[5]],
    [TicTacToeFelder[6], TicTacToeFelder[7], TicTacToeFelder[8]],
    [TicTacToeFelder[0], TicTacToeFelder[3], TicTacToeFelder[6]],
    [TicTacToeFelder[1], TicTacToeFelder[4], TicTacToeFelder[7]],
    [TicTacToeFelder[2], TicTacToeFelder[5], TicTacToeFelder[8]],
    [TicTacToeFelder[2], TicTacToeFelder[5], TicTacToeFelder[8]],
    [TicTacToeFelder[0], TicTacToeFelder[4], TicTacToeFelder[8]],
    [TicTacToeFelder[2], TicTacToeFelder[4], TicTacToeFelder[6]],
]; 


let aktuelleSpielerKlasse; 

overlayButton.addEventListener("click", spielStarten);

function zugBeenden() { // prüfen ob der spieler der gerade drann ist gewonnen hat
    if(sieg_Pruefen() === true){
        
        spielBeenden(false); 
        return;        
      }
    if(unentschiedenPruefen() === true){ 
      spielBeenden(true); 
      return; 
    }
    
  if (aktuelleSpielerKlasse === Kreuz_Klasse) {
    
    aktuelleSpielerKlasse = Kreis_Klasse; 
    
  } else if (aktuelleSpielerKlasse === Kreis_Klasse) {

    aktuelleSpielerKlasse = Kreuz_Klasse;
  } else {
    
    aktuelleSpielerKlasse = Math.random() < 0.5 ? Kreis_Klasse : Kreuz_Klasse; 
  }
  spieleranzeigeAktualisieren(); 
  

  if(aktuelleSpielerKlasse===Kreuz_Klasse){ 
    setTimeout(computerKlick, 2000)
    
  }
}

function spieleranzeigeAktualisieren(){ 
    WerDrannIst.classList.remove(Kreis_Klasse, Kreuz_Klasse); 

    if(aktuelleSpielerKlasse === Kreis_Klasse){
        WerDrannIst.innerText = "Du bist an der Reihe.";
    }else{
        WerDrannIst.innerText = "Der Gegner ist an der Reihe.";

    }
    WerDrannIst.classList.add(aktuelleSpielerKlasse); 
}

spielStarten(); //spielstarten funktion aufrufen

function klickAufFeldverarbeiten(ereignis) {

  
  if(aktuelleSpielerKlasse=== Kreuz_Klasse){
    return; 
  }
  
  
  const TicTacToeFeld = ereignis.target; 
 
  if (spielFigurSetzen(TicTacToeFeld) === true) {
    zugBeenden(); 
  } 
}
function spielFigurSetzen(TicTacToeFeld) {
 
  
  if (
    TicTacToeFeld.classList.contains(Kreis_Klasse) || 
    TicTacToeFeld.classList.contains(Kreuz_Klasse)
  ) {
    
    return false; 
  }
  
  TicTacToeFeld.classList.add(aktuelleSpielerKlasse); 
  
  TicTacToeFeld.disabled = true; 
  
  return true;
}

function spielStarten() {
  

  // das overlay wieder verstecken wenn es sichtbar ist damit man die overlaybutton zum erneut spielen richtig programmiern kann 
  overlay.classList.remove(SICHTBAR_KLASSE);
  overlayText.classList.remove(Kreis_Klasse, Kreuz_Klasse) 


  aktuelleSpielerKlasse = null; 

  for (const TicTacToeFeld of TicTacToeFelder) {
    
    TicTacToeFeld.classList.remove(Kreis_Klasse, Kreuz_Klasse) 

    TicTacToeFeld.disabled = false;

     
    TicTacToeFeld.addEventListener("click", klickAufFeldverarbeiten); 

  }
  zugBeenden(); 
}

function sieg_Pruefen(){
    
    for(const möglichkeit of Sieg_Möglichkeiten){
        const spielgewonnen = möglichkeit.every(function(TicTacToeFeld){
            return TicTacToeFeld.classList.contains(aktuelleSpielerKlasse); 

        });

        if(spielgewonnen === true){
            
            return true; 
        }

    }

    return false;

}
                                      
function spielBeenden(unentschieden){ 
  if(unentschieden === true){ 
    overlayText.innerText = "Unentschieden!"
  }
  else if(aktuelleSpielerKlasse === Kreis_Klasse){
    overlayText.innerText = "Du hast gewonnen!";
    overlayText.classList.add(Kreis_Klasse); 
  } else {
    overlayText.innerText = "Der Roboter hat gewonnen!";
    overlayText.classList.add(Kreuz_Klasse) 

  }
   
  overlay.classList.add(SICHTBAR_KLASSE); 
}

function unentschiedenPruefen(){
  for(const TicTacToeFeld of TicTacToeFelder){ 
    // prüfe ob das Feld noch unbesetzt ist
    if(
      !TicTacToeFeld.classList.contains(Kreis_Klasse) &&   
      !TicTacToeFeld.classList.contains(Kreuz_Klasse)
    ) {
      
      return false;

    }
  }
  
  return true;
}

function computerKlick(){ 
  
  const zufallsIndex = Math.floor(Math.random()*9) ; 
  
  if(spielFigurSetzen(TicTacToeFelder[zufallsIndex]) === true){  
    zugBeenden();
    
    computerKlick();
    const x = zufallsIndex % 3;
    const y = Math.floor(zufallsIndex / 3);
  }


}
function computerKlick() { 
  const zufallsIndex = Math.floor(Math.random() * 9);

  const x = zufallsIndex % 3;

  const y = Math.floor(zufallsIndex / 3);

  const daten = {x: x, y: y}; // erstelle ein Datenobjekt mit den Koordinaten

  fetch('/spielzug', { // sende die Daten per POST-Request an den Server
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(daten)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Fehler beim Senden der Daten an den Server');
    }
    return response.json();
  }).then(data => {
    // handle the response from the server
    console.log('Antwort vom Server:', data);
  }).catch(error => {
    console.error('Fehler:', error);
  });

  if(spielFigurSetzen(TicTacToeFelder[zufallsIndex])) {  
    zugBeenden();
    computerKlick(); 
  }
}




  
