const firstPage = document.querySelector('#first-page')
const lastPage = document.querySelector('#last-page')
const name = document.querySelector('#name')
const monthly = document.querySelector('#monthly')
const fees = document.querySelector('#fees')
const inputTime = document.querySelector('#time')
const buttonOne = document.querySelector('#buttonOne')
const buttonTwo = document.querySelector('#buttonTwo')
const h1name = document.querySelector("#h1name")
const result = document.querySelector('#result')
const form = document.querySelector('#form')


console.log()

form.onsubmit = function(evento){
    evento.preventDefault()

let monthlyValue = monthly.value
let time = inputTime.value * 12
let feesValue = fees.value
let nameUser = name.value






/*----Requisição para a API http://api.mathjs.org/v4/ --- */

 function resul(){

    const dados = fetch("http://api.mathjs.org/v4/", {
         method: "POST",
         headers: {
         "Content-Type": "application/json"
            },
         body: JSON.stringify({
            "expr": `${monthlyValue} * (((1 + ${feesValue}) ^ ${time} - 1) / ${feesValue})`
            })
        })
        .then(response => response.text())
        .then(data => {

            const roundOne = data.match(/\d+(?:\.\d+)?/g)[0]
            const roundTree = Number(roundOne).toFixed(2)
            
            lastPage.style.display ="block"
            h1name.innerHTML = `Você terá R$ ${roundTree} ` 
            console.log(roundTree)
            }); 
    }
    resul()
    
}



