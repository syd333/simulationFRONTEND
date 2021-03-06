const BASE_URL = "http://localhost:3000"
const BLOCKS_URL = `${BASE_URL}/blocks`
const CHANNELS_URL = `${BASE_URL}/channels`

document.addEventListener("DOMContentLoaded", function() {
    getBlocks()
    getChannels()
})
function getBlocks(){
    fetch(BLOCKS_URL)
    .then(res => res.json())
    .then(console.log)
}

function getChannels(){
    fetch(CHANNELS_URL)
    .then(res => res.json())
    .then(console.log)
}