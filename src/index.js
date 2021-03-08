const BASE_URL = "http://localhost:3000"
const BLOCKS_URL = `${BASE_URL}/blocks`
const CHANNELS_URL = `${BASE_URL}/channels`

document.addEventListener("DOMContentLoaded", function() {
    getChannels()
    getBlocks()
})
function getBlocks(){
    fetch(BLOCKS_URL)
    .then(res => res.json())
    .then(blocks => blocks.forEach(block => buildBlock(block)))
}

function getChannels(){
    fetch(CHANNELS_URL)
    .then(res => res.json())
    .then(channels => channels.forEach(channel => buildChannel(channel)))
}


function buildChannel(channel){
        const container = document.querySelector('.channel-container') 
        const card = document.createElement('card')
        const p = document.createElement('p')


        container.id = channel.id
        container.className = 'channel-container'
        card.className = 'card-body-channel'
        p.className = 'channel-title'
        p.textContent = channel.title


        container.appendChild(card)
        card.appendChild(p)

        container.addEventListener('click', showHideDiv)
        // console.log(channel)
        }

function buildBlock(block){
    const containerB = document.querySelector('.block-container') 
    const card = document.createElement('card')
    const h5 = document.createElement('h5')
    const p = document.createElement('p')

    containerB.id = block.channel_id
    containerB.className = 'block-container'
    card.className = 'card-body-block'
    h5.className = 'card-title'
    p.className = 'card-text'
    h5.textContent = block.title
    p.innerText = block.description

    containerB.appendChild(card)
    card.append(h5, p)
    // console.log(block.channel_id)
}

function showHideDiv(block, channel) {
 // if channel.block is equal to block ID 
 let container = document.querySelector('channel-container')
 let blockId = document.getElementById(block.channel_id)
 if (container.channel.block.channel_id === blockId) {
 if (blockId.style.display == null || blockId.style.display == "none"){
    blockId.style.display = "block";
 } else {
    blockId.style.display = "none"
 }
 }

}

