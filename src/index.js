// global variables
const BASE_URL = "http://localhost:3000"
const BLOCKS_URL = `${BASE_URL}/blocks`
const CHANNELS_URL = `${BASE_URL}/channels`
let editBlockForm = document.querySelector('.edit-block-form')

// first FETCH
document.addEventListener("DOMContentLoaded", function() {
    getChannels()
})

// GET FETCH CHANNEL
function getChannels(){
    fetch(CHANNELS_URL)
    .then(res => res.json())
    .then(channels => {
        channels.forEach(channel => buildChannel(channel))
        buildBlockFormDropDown(channels)
    })
    .then(getBlocks())
}

// POST FETCH CHANNEL
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

// GET FETCH BLOCK
function getBlocks(){
    fetch(BLOCKS_URL)
    .then(res => res.json())
    .then(blocks => blocks.forEach(block => buildBlock(block)))
}

// POST FETCH BLOCK
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

// DELETE FETCH BLOCK
function deleteBlock(block, cardB) {
    fetch(BLOCKS_URL + `/${block.id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            cardB.remove()
        })
}

function deleteChannel(channel, cardC) {
    fetch(CHANNELS_URL + `/${channel.id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            cardC.remove()
        })
}

// PATCH FETCH BLOCK
function editBlock(block){
    // console.log(block.id)
    fetch(BLOCKS_URL + `/${block.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(block)
    })
    .then(res => res.json())
    .then(block => {
        let cardB = document.querySelector(`#${block.id}`)
        let h5 = document.querySelector('h5')
        let p = document.querySelector('p')
        h5.textContent = block.title
        p.textContent = block.description
    })

        
}

// RENDERING DOM ELEMENTS
function buildChannel(channel){
        const container = document.querySelector('.channel-container') 
        const cardC = document.createElement('card')
        const p = document.createElement('p')
        // const deleteBtn = document.createElement('button')

        p.dataset.id = channel.id
        container.className = 'channel-container'
        cardC.className = 'card-body-channel'
        p.className = 'channel-title'
        p.textContent = channel.title
        // deleteBtn.innerText = 'x'

        container.appendChild(cardC)
        cardC.appendChild(p)
        // deleteBtn.addEventListener('click', () => deleteChannel(channel, cardC))
        // card.addEventListener('click', (e) => {
        //   return showHideDiv(e) 
        // console.log(p.parentElement)
        // })
    }

let blockContainer = document.querySelector('.block-container')
function buildBlock(block){
    // if (document.getElementById(block.channel_id) === null ) {
            let blockDiv = document.createElement('div')
            const containerB = document.createElement('div')
            const cardB = document.createElement('card')
            const h5 = document.createElement('h5')
            const p = document.createElement('p')
            const deleteBtn = document.createElement('button')
            const editBtn = document.createElement('button')
        
            
            containerB.className = 'block-container'
            containerB.id = block.channel_id
            cardB.id = block.id
            // containerB.dataset.id = block.id
            cardB.className = 'card-body-block'
            // h5.contentEditable = "true"
            h5.className = 'card-title'
            p.className = 'card-text'
            editBtn.className = 'editBtn'
            // p.contentEditable = "true"
            h5.textContent = block.title
            p.innerText = block.description
            deleteBtn.innerText = 'x'
            editBtn.innerText = 'e'
            editBtn.id = block.id
            editBtn.data = block.channel_id

            // blockDiv.hidden = false
            cardB.append(h5, p, editBtn, deleteBtn)
            containerB.appendChild(cardB)
            blockDiv.append(containerB)
            blockContainer.append(blockDiv)
            deleteBtn.addEventListener('click', () => deleteBlock(block, cardB))



            editBtn.addEventListener('click', (e) => {
                // console.log(e.target.id)
                if(editBlockForm.hidden) {
                    editBlockForm.id = e.target.id
                    editBlockForm.data = e.target.data
                    editBlockForm.hidden = !editBlockForm.hidden
                } else {
                    editBlockForm.hidden = !editBlockForm.hidden
                }
            })
  
    // } else {
        // let blockDiv = document.getElementById(block.channel_id)
        // const containerB = document.createElement('div') 
        // const cardB = document.createElement('card')
        // const h5 = document.createElement('h5')
        // const p = document.createElement('p')
        // const deleteBtn = document.createElement('button')
    
        // containerB.className = 'block-container'
        // containerB.id = block.channel_id
        // containerB.dataset.id = block.id
        // cardB.className = 'card-body-block'
        // h5.className = 'card-title'
        // p.className = 'card-text'
        // h5.textContent = block.title
        // p.innerText = block.description
        // deleteBtn.innerText = 'x'

        // blockDiv.hidden = false
        // cardB.append(h5, p)
        // containerB.appendChild(cardB)
        // blockDiv.append(containerB)
        // blockContainer.append(blockDiv)

        // deleteBtn.addEventListener('click', deleteBlock(block, containerB.dataset.id))
        // console.log(containerB.dataset.id)
        // console.log(blockDiv)

    // }
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


editBlockForm.addEventListener('submit', (e) => editedBlock(e))
function editedBlock(e){
    // console.log(e.target.id)
    e.preventDefault()
    let newBlock = {
        id: e.target.id,
        title: e.target.title.value,
        description: e.target.description.value,
        channel_id: e.target.data,
        user_id: 41
    }
    editBlockForm.reset()
    editBlock(newBlock)
}

// FORM HIDDEN WHEN CLICKED ON CREATE CHANNEL
let channelForm = document.querySelector('.channel-form')
   const createChannel = document.querySelector('.create-channel')
   createChannel.addEventListener('click', () => {
        if(channelForm.hidden) {
            channelForm.hidden = !channelForm.hidden
        } else {
            channelForm.hidden = !channelForm.hidden
        }
   })

   // FILLIN OUT CHANNEL FORM 
channelForm.addEventListener('submit', newChannel)
function newChannel(e){
    e.preventDefault()
        let channel = {
            title: e.target.title.value
    }
    channelForm.reset()
        postChannel(channel)
}

// FORM HIDDEN WHEN CLICKED ON CREATE BLOCK
let blockForm = document.querySelector('.block-form')
   const createBlock = document.querySelector('.create-block')
   createBlock.addEventListener('click', () => {
        if(blockForm.hidden) {
            blockForm.hidden = !blockForm.hidden
        } else {
            blockForm.hidden = !blockForm.hidden
        }
   })

   //FILLIN OUT BLOCK FORM
blockForm.addEventListener('submit', (e) => newBlock(e))
function newBlock(e){
    e.preventDefault()
    let block = {
        title: e.target.title.value,
        description: e.target.description.value,
        channel_id: e.target[2].value,
        user_id: 41
    }
    blockForm.reset()
    postBlock(block)
}

// DROP DOWN 
function buildBlockFormDropDown(CHANNELSARR) {
    let dropdown = document.getElementById('channelList')
    CHANNELSARR.forEach((channel) => {
        let options = document.createElement('option')
        options.innerText = channel.title 
        options.value = channel.id
        dropdown.appendChild(options)
    })
}

// REFRESH TO HOME WHEN CLICKED ON SIMULATION
let homelink = document.querySelector('.home')
homelink.addEventListener("click", refreshPage)
    function refreshPage(){
        window.location.reload();
    } 