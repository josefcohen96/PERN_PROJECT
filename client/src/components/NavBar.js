async function setUpConnected(){
    let name = await getName()
    // If connected
    if(name !== '') {
        if(document.getElementById('hello') !== null){
            document.getElementById('hello').innerHTML = 'Hello ' + name
        }
        document.getElementById("sign-out-btn").style.display = "inline-block"
    }
    // If disconnected
    else {
        document.getElementById("sign-in-btn").style.display = "inline-block"
        document.getElementById("sign-up-btn").style.display = "inline-block"
    }
}

async function getName() {
    try {
        const obj = await fetch('/get-name')

        const data = await obj.json()

        return data.name
    }
    catch(err){
        return ''
    }
}

setUpConnected()