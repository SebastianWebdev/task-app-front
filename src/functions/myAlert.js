const createHTMLElement = (element = '', properties = {}) => {
    const htmlElement = document.createElement(element)
    if (properties) {
        const propKeys = Object.keys(properties)
        propKeys.forEach(key => {
            if (key === 'className') {
                htmlElement.classList.add(properties[key])
            } else if (key === 'id') {
                htmlElement.id = (properties[key])
            }
        })

    }

    return htmlElement
}

const myAlert = (message = "", type = true) => {
    let result = false
    const eventFunction = e => {
        if (e.target.classList.contains('custom-alert-button_ok') || e.target.classList.contains('custom-alert-button_yes')) {
            result = true
        } else if (e.target.classList.contains('custom-alert-button_no')) {
            result = false
        }
    }
    const wrapper = createHTMLElement('div', { className: 'custom-alert_wrapper' })
    const messageElement = createHTMLElement('h1', { className: 'custom-alert_message' })
    const buttonOk = createHTMLElement('button', { className: 'custom-alert-button_ok' })
    const buttonYes = createHTMLElement('button', { className: 'custom-alert-button_yes' })
    const buttonNo = createHTMLElement('button', { className: 'custom-alert-button_no' })
    messageElement.innerHTML = message
    buttonOk.innerHTML = 'OK'
    buttonYes.innerHTML = 'Tak'
    buttonNo.innerHTML = 'Nie'

    wrapper.appendChild(messageElement)
    if (type) {
        buttonOk.addEventListener('click', eventFunction)
        wrapper.appendChild(buttonOk)

    } else {
        buttonYes.addEventListener('click', eventFunction)
        buttonNo.addEventListener('click', eventFunction)
        wrapper.appendChild(buttonYes)
        wrapper.appendChild(buttonNo)
    }
    document.appendChild(wrapper)
    return result
}
export default myAlert