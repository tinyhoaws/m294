let chosennumber = prompt("Enter a number","numer");
let rng = Math.floor(Math.random() * 100);
if (chosennumber === rng) {
    document.write(chosennumber + " ist korrekt (" + rng + ")")
} else if (chosennumber > rng) {
    document.write(chosennumber + " ist zu hoch (" + rng + ")")
} else if (chosennumber < rng) {
    document.write(chosennumber + " ist zu niedrig (" + rng + ")")
};