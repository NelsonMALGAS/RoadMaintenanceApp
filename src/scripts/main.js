const appResources = {
    appoverlays :{
        queryoverlay: document.querySelector('[data-query-overlay]')
    },
    appbuttons :{
        querybutton: document.querySelector('[data-query-button]')
    }
}

appResources.appbuttons.querybutton.addEventListener('click', (event) => {
    event.preventDefault()
    appResources.appoverlays.queryoverlay.style.display = 'block'
})