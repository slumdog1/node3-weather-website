
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log("got it")
            fetch('/weather?address=' + location).then((response) => {
                 response.json().then((data) => {
                    messageOne.textContent = data.forecast
         })
    })
})