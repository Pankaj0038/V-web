document.addEventListener('DOMContentLoaded', function() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const mytext = document.querySelector('h1');
        let interval;

        mytext.addEventListener('mouseenter', function() {
            clearInterval(interval); 
            mytext.innerText = mytext.dataset.value;

            let iteration = 0;
            interval = setInterval(() => {
                mytext.innerText = mytext.innerText.split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return mytext.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                if (iteration >= mytext.dataset.value.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 30);
        });
    });

function view(id) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const content = card.querySelector('.content');
        const thumbnail = card.querySelector('.thumbnail');
        if (card.id !== id) { 
            card.style.gridColumn = "";  
            card.style.gridRow= ""; 
            content.style.display = "none"; 
            thumbnail.style.display = "flex"; 
        }
    });
    const card = document.getElementById(id);
    const content = card.querySelector('.content');
    const thumbnail = card.querySelector('.thumbnail');
    card.style.gridColumn = "1 / span 4"; 
    card.style.gridRow = "1"
    content.style.display = "flex"; 
    thumbnail.style.display = "none"; 
}
function hide(id) {
    const card = document.getElementById(id);
    const content = card.querySelector('.content');
    const thumbnail = card.querySelector('.thumbnail');
    card.style.gridColumn= "";
    content.style.display = "none";
    thumbnail.style.display = "flex";
}

function copy(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  // copyText.setSelectionRange(0, 99999);
  window.getSelection().removeAllRanges();
  // navigator.clipboard.writeText(copyText.value);
  // alert("Copied the text: " + copyText.value);
}