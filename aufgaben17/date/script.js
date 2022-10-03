let username = prompt("Enter your name","name");
let date = new Date();
let time = date.getHours();
if (time > 5 && time < 10) {
    document.write("Guten Morgen " + username)
} else if (time > 10 && time < 17) {
    document.write("Guten Tag " + username)
} else if (time > 17 && time < 21) {
    document.write("Guten Abend " + username)
} else if (time > 21 && time < 5) {
    document.write("Gute Nacht " + username)
};