const BASE_URL = "http://localhost:3000"
const BLOCKS_URL = `${BASE_URL}/blocks`
const CHANNELS_URL = `${BASE_URL}/channels`
// const CHANNELSARR = []
// everytime a channel it gets pushed into an array
// function with array then iterates over array 
// grabs the select/options to populate for block form

document.addEventListener("DOMContentLoaded", function() {
    getChannels()
})
function getChannels(){
    fetch(CHANNELS_URL)
    .then(res => res.json())
    .then(channels => {
        channels.forEach(channel => buildChannel(channel))
        buildBlockFormDropDown(channels)
    })
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

function postBlock(block){
    fetch(BLOCKS_URL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(block)
    })
    .then(res => res.json())
    .then(block => buildBlock(block))

}

function buildChannel(channel){
        const container = document.querySelector('.channel-container') 
        const card = document.createElement('card')
        const p = document.createElement('p')

        p.dataset.id = channel.id
        container.className = 'channel-container'
        card.className = 'card-body-channel'
        p.className = 'channel-title'
        p.textContent = channel.title

        container.appendChild(card)
        card.appendChild(p)

        card.addEventListener('click', (e) => {
        //   return showHideDiv(e) 
        // console.log(p.parentElement)
        })
    }

let blockContainer = document.querySelector('.block-container')
function buildBlock(block){
    if (document.getElementById(block.channel_id) === null ) {
            let blockDiv = document.createElement('div')
            const containerB = document.createElement('div')
            const cardB = document.createElement('card')
            const h5 = document.createElement('h5')
            const p = document.createElement('p')
            // const deleteBtn = document.createElement('button')
        
            
            containerB.className = 'block-container'
            containerB.id = block.channel_id
            // containerB.dataset.id = block.id
            cardB.className = 'card-body-block'
            h5.className = 'card-title'
            p.className = 'card-text'
            h5.textContent = block.title
            p.innerText = block.description
            // deleteBtn.innerText = 'x'
        
            // blockDiv.hidden = false
            cardB.append(h5, p)
            containerB.appendChild(cardB)
            blockDiv.append(containerB)
            blockContainer.append(blockDiv)

            // deleteBtn.addEventListener('click', deleteBlock(block, containerB.dataset.id))

    } else {
        let blockDiv = document.getElementById(block.channel_id)
        const containerB = document.createElement('div') 
        const cardB = document.createElement('card')
        const h5 = document.createElement('h5')
        const p = document.createElement('p')
        // const deleteBtn = document.createElement('button')
    
        containerB.className = 'block-container'
        containerB.id = block.channel_id
        // containerB.dataset.id = block.id
        cardB.className = 'card-body-block'
        h5.className = 'card-title'
        p.className = 'card-text'
        h5.textContent = block.title
        p.innerText = block.description
        // deleteBtn.innerText = 'x'

        // blockDiv.hidden = false
        cardB.append(h5, p)
        containerB.appendChild(cardB)
        blockDiv.append(containerB)
        blockContainer.append(blockDiv)

        // deleteBtn.addEventListener('click', deleteBlock(block, containerB.dataset.id))
        // console.log(containerB.dataset.id)
        // console.log(blockDiv)

    }
}

// function showHideDiv(e) {
//     const div = document.getElementById(e.target.dataset.id)
//     console.log(e.target)
//     if (div.hidden) {
//         div.hidden = !div.hidden
//     } else {
//         div.hidden = !div.hidden
//     }
// }

//if ++channel clicked - for will populate 
let channelForm = document.querySelector('.channel-form')
   const createChannel = document.querySelector('.create-channel')
   createChannel.addEventListener('click', () => {
        if(channelForm.hidden) {
            channelForm.hidden = !channelForm.hidden
        } else {
            channelForm.hidden = !channelForm.hidden
        }
   })

channelForm.addEventListener('submit', newChannel)
function newChannel(e){
    e.preventDefault()
        let channel = {
            title: e.target.title.value
    }
    channelForm.reset()
        postChannel(channel)
}


let blockForm = document.querySelector('.block-form')
   const createBlock = document.querySelector('.create-block')
   createBlock.addEventListener('click', () => {
        if(blockForm.hidden) {
            blockForm.hidden = !blockForm.hidden
        } else {
            blockForm.hidden = !blockForm.hidden
        }
   })

blockForm.addEventListener('submit', (e) => newBlock(e))
function newBlock(e){
    e.preventDefault()
    let block = {
        title: e.target.title.value,
        description: e.target.description.value,
        channel_id: e.target[2].value,
        user_id: 41
    }
    postBlock(block)
    blockForm.reset()
}

function buildBlockFormDropDown(CHANNELSARR) {
    let dropdown = document.getElementById('channelList')
    CHANNELSARR.forEach((channel) => {
        let options = document.createElement('option')
        options.innerText = channel.title 
        options.value = channel.id
        dropdown.appendChild(options)
    })
    
}

function deleteBlock(block) {
    fetch(BLOCKS_URL + `/${block.id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            containerB.dataset.id.remove()
        })
}