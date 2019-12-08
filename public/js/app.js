gitfetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
            fetch('/weather?address=' + location).then((response) => {
                 response.json().then((data) => {
                    messageOne.textContent = data.forecast
         })
    })
})