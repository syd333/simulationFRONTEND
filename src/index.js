const BASE_URL = "http://localhost:3000"
const BLOCKS_URL = `${BASE_URL}/blocks`
const CHANNELS_URL = `${BASE_URL}/channels`

document.addEventListener("DOMContentLoaded", function() {
    getChannels()
})
function getChannels(){
    fetch(CHANNELS_URL)
    .then(res => res.json())
    .then(channels => channels.forEach(channel => buildChannel(channel)))
    .then(getBlocks())
}

function postChannel(channel){
    fetch(CHANNELS_URL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(channel)
    })
    .then(res => res.json())
    .then(channel => buildChannel(channel))
}

function getBlocks(){
    fetch(BLOCKS_URL)
    .then(res => res.json())
    .then(blocks => blocks.forEach(block => buildBlock(block)))
}

function buildChannel(channel){
        const container = document.querySelector('.channel-container') 
        const card = document.createElement('card')
        const p = document.createElement('p')
        let blockDiv = document.createElement('div')
        let blockContainer = document.querySelector('.block-container')

        p.dataset.id = channel.id
        blockDiv.id = channel.id
        container.className = 'channel-container'
        card.className = 'card-body-channel'
        p.className = 'channel-title'
        p.textContent = channel.title

        container.appendChild(card)
        card.appendChild(p)

        card.addEventListener('click', (e) => showHideDiv(e, p.dataset.id))
        blockContainer.appendChild(blockDiv)
        }

function buildBlock(block){
    // console.dir(document.querySelector('.block-container'))
    // let div = await function() {
    //    return document.getElementById(26)
    // }

    console.log(div())

    const containerB = document.createElement('div') 
    const cardB = document.createElement('card')
    const h5 = document.createElement('h5')
    const p = document.createElement('p')

    containerB.className = 'block-container'
    containerB.id = block.channel_id
    cardB.className = 'card-body-block'
    h5.className = 'card-title'
    p.className = 'card-text'
    h5.textContent = block.title
    p.innerText = block.description

    cardB.append(h5, p)
    containerB.appendChild(cardB)
    // div.appendChild(containerB)

}

function showHideDiv(e, channel_id) {
    console.dir("e target", e.target)
    console.log("channel id", channel_id)
    //if div exists with blockId
    // show div 
// if p is clicked or body  
//  let blockId = document.getElementById(.channel_id)
//  if (e.style.display == null || e.style.display == "none"){
//     e.style.display = "block";
//  } else {
//     e.style.display = "none"
// }
// if (document.getElementById(counter.innerText) === null) {
//     // create li for counter inner text
//     let li = document.createElement("li");
//     li.id = counter.innerText;
//     li.data = 1;
//     li.innerHTML =
//       counter.innerText + " has been liked " + li.data + " times";
//     likesUl.appendChild(li);
//   } else {
//     let li = document.getElementById(counter.innerText);
//     li.data++;
//     li.innerHTML =
//       counter.innerText + " has been liked " + li.data + " times";
//   }
}

//if ++channel clicked - for will populate 
let form = document.querySelector('form')
   const createChannel = document.querySelector('.create-channel')
   createChannel.addEventListener('click', () => {
        if(form.hidden) {
            form.hidden = !form.hidden
        } else {
            form.hidden = !form.hidden
        }
   })

form.addEventListener('submit', newChannel)

function newChannel(e){
    e.preventDefault()
        let channel = {
            title: e.target.title.value
    }
        postChannel(channel)
}




function newBlock(e){

}