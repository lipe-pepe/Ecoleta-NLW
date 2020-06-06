
// colocando os estados no seletor
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //Função anonima que esta retornadno um valor
    .then( states => {
       
        //Ordenar estados por nome
        states.sort(function (a, b) {
            return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
        })

        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect =  document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
       

        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}



document
    .querySelector("select[name=uf]") // Procura o select que tenha o name uf.
    .addEventListener("change", getCities)

// Items de Coleta

// Vamos adicionar um ouvidor de eventos para todos os itens de coleta usando um laço de rep. */
// Pegar todos os LIs
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target
    
    // Adicionar ou remover uma classe com JavaScript:
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem items selecionados, se sim, pegar os itens selecionados.
    // Pegar os itens selecioandos
    
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId  // isso será true ou false
        return itemFound
    })

    // Se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
         // Se não estiver selecionado, adicionar a seleção
         selectedItems.push(itemId)

    }

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}