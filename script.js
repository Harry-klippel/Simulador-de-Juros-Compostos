const firstPage = document.querySelector('#first-page')
const lastPage = document.querySelector('#last-page')
const userName = document.querySelector('#name')
const monthly = document.querySelector('#monthly')
const fees = document.querySelector('#fees')
const inputTime = document.querySelector('#time')
const button = document.querySelector('#buttonTwo')
const h2 = document.querySelector("#h2name")
const h3 = document.querySelector('#h3')
const message = document.querySelector('#result')
const form = document.querySelector('#form')


 /*---------Chamada da 2º tela com a resposta----------*/

function extractNumber(data) {
    const roundOne = data.match(/\d+(?:\.\d+)?/g)[0]
    return Number(roundOne).toFixed(2)
}

function displayMessage(roundTree){
    firstPage.style.display = "none"
    lastPage.style.display = "flex"
    let user = userName.value
    let monthlyValue = monthly.value
    let feesValue = fees.value
    let time = inputTime.value
    
    h2.innerHTML = `Olá ${user}` 
    message.innerHTML = `Juntando R$ <u>${monthlyValue},00</u> todos os meses, durante <u>${time} ano(s)</u>, a uma taxa de juros de <u>${feesValue}%</u> você terá juntado: ↓`
    h3.innerHTML =  roundTree
}


/*----Requisição para a API http://api.mathjs.org/v4/ --- */

form.onsubmit = function(evento){
    evento.preventDefault()
    let monthlyValue = monthly.value.replace(',','.')
    let time = inputTime.value * 12 
    let feesValue = fees.value.replace(',','.')
    feesValue = feesValue / 100

   function consult(){
    const dados =  fetch("http://api.mathjs.org/v4/", {
         method: "POST",
         headers: {
         "Content-Type": "application/json"
            },
         body: JSON.stringify({
            "expr": `${monthlyValue} * (((1 + ${feesValue}) ^ ${time} - 1) / ${feesValue})`
            })
        })
        .then(response => response.text())
        .then(extractNumber)
        .then(displayMessage)
        .then(buttomReturn)
    }
    consult()
}

/*---------Manipulação dos Inputs-------- */

monthly.addEventListener('focus', () => {
    monthly.placeholder = "R$"
  });
  
  monthly.addEventListener("blur",() => {
    monthly.placeholder = "Valor da Mensalidade";
  });

  fees.addEventListener('focus', () => {
    fees.placeholder = "%"
  });
  
  fees.addEventListener("blur",() => {
    fees.placeholder = "Taxa de Juros";
  });


  /*---------Efeito Texto digitando sozinho-------- */

document.addEventListener('DOMContentLoaded', () => {
  new TypeIt(".animated", {
    speed: 220,
    delay: 400,
    waitUntilVisible: true,
    
  })
    .type('de Roubo Composto')
    .move(-9)
    .delete(5)
    .type('Juros', {delay:500})
    .move(null, { to: "END" })
    .type('s.')

  .go();
})


