const firstPage = document.querySelector('#first-page')
const lastPage = document.querySelector('#last-page')
const userName = document.querySelector('#name')
const monthly = document.querySelector('#monthly')
const fees = document.querySelector('#fees')
const inputTime = document.querySelector('#time')
const buttonTwo = document.querySelector('#buttonTwo')
const buttonOne = document.querySelector('#buttonOne')
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
    
    h2.innerHTML = `Olá <strong style="font-weight:900; font-family: Arial Black, sans-serif;">${user}!</strong>` 
    message.innerHTML = `Juntando R$ <span style="background-image: linear-gradient(to right, black, purple);-webkit-background-clip: text;color: transparent;">${monthlyValue},00</span> todos os meses, durante <span style="background-image: linear-gradient(to right, black, purple);-webkit-background-clip: text;color: transparent;">${time} ano(s)</span>, a uma taxa de juros de <span style="background-image: linear-gradient(to right, black, purple);-webkit-background-clip: text;color: transparent;">${feesValue}%</span> você terá juntado: ↓`
    h3.innerHTML = `<span style="color: black;font-weight: 900;font-family: Arial Black, sans-serif;">R$ ${roundTree}</span>`
}

function buttomReturn() {
  buttonTwo.addEventListener('click', () => {
    //location.reload()   <== poderia usar também, mas quero evitar recarregar a pagina
    lastPage.style.display = "none"
    firstPage.style.display = "flex"

    userName.value = ""
    monthly.value = ""
    fees.value = ""
    inputTime.value = "1"
  })
}

/*-------------Validando Inputs------------------*/

function validation() {
  let isValid = true;
  const errorMessage1 = document.createElement("span")
  const errorMessage2 = document.createElement("span")
  const errorMessage3 = document.createElement("span")

  const existingError1 = userName.nextElementSibling
  const existingError2 = monthly.nextElementSibling
  const existingError3 = fees.nextElementSibling

  if (userName.value == "") {
    userName.classList.add("error")
    errorMessage1.classList.add("error-message")
    errorMessage1.textContent = "* Por favor, preencha este campo."
    userName.insertAdjacentElement("afterend", errorMessage1) // Adiciona o span após o input
    isValid = false 
  } else {
    userName.classList.remove("error")
  }


  if (monthly.value === "" || isNaN(monthly.value.replace(",", "."))) {
      monthly.classList.add("error")
      errorMessage2.classList.add("error-message")
      errorMessage2.textContent = "* Por favor, preencha este campo."
      monthly.insertAdjacentElement("afterend", errorMessage2) 
      isValid = false
    }else { 
    monthly.classList.remove("error")
  }


  if (fees.value === "" || isNaN(fees.value.replace(",", "."))) {
      fees.classList.add("error")
      errorMessage3.classList.add("error-message")
      errorMessage3.textContent = "* Por favor, preencha este campo."
      fees.insertAdjacentElement("afterend", errorMessage3) 
      isValid = false
  } else {
    fees.classList.remove("error")
    }
  
 
  userName.addEventListener("focus", function() {
    if (existingError1) {
      existingError1.remove()
      userName.classList.remove("error")
    }
  })
  if(existingError1) {
    existingError1.textContent = ""
    }
  

  monthly.addEventListener("focus", function() {
    if (existingError2) {
      existingError2.remove()
      monthly.classList.remove("error")
    }
  })
  if(existingError2) {
    existingError2.textContent = ""
    }


  fees.addEventListener("focus", function() {
    if (existingError3) {
      existingError3.remove()
      fees.classList.remove("error")
    }
  })
  if(existingError3) {
    existingError3.textContent = ""
    }

  return isValid
}


/*----Requisição para a API http://api.mathjs.org/v4/ --- */

form.onsubmit = function(evento){
    evento.preventDefault()


     if (!validation()) {
       buttonOne.addEventListener('click', ()=> {
        console.log('ok')
       } )
      return;
      }

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
        .catch(error => {
          alert("Ops! Estamos enfrentando uma instabilidade no momento, por favor tente mais tarde.")
        })
      
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
    speed: 190,
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


