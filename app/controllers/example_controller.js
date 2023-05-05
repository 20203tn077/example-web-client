// VARIABLES

// Elements
const lblGreeting = document.getElementById('lblGreeting') // Greeting label
const txtName = document.getElementById('txtName') // Name input
const txtItem = document.getElementById('txtItem') // Item input
const conItems = document.getElementById('conItems') // Item list container

const itemTemplate = `
<div class="col-md-6 col-lg-4 col-xl-3">
    <div class="card shadow-sm">
        <div class="card-body">
            <h6>$item</h6>
        </div>
    </div>
</div>
`

// INTERNAL FUNCTIONS

// Render item list
function renderList(list = []) {
    let content = ''
    for (item of list) {
        content += itemTemplate.replace('$item', item)
    }
    conItems.innerHTML = content
}

// PUBLIC FUNCTIONS

// Simple text fetch
function getGreeting() {
    api.fetch('/').then((res) => res.text()).then((greeting) => lblGreeting.innerText = greeting)
}

// Random message
function getRandom() {
    api.fetch('/random').then((res) => res.text()).then((random) => notyf.success(random))
}

// Message with name from input
function getMessage() {
    const name = txtName.value
    txtName.value = ''
    if (name)
        api.fetch(`/message/${name}`).then((res) => res.text()).then((message) => notyf.success(message))
}

// Item list with fetch and add methods
function getItems() {
    api.fetch('/list').then((res) => res.json()).then((list) => renderList(list))
}
function addItem() {
    const item = txtItem.value
    txtItem.value = ''
    if (item) api.fetch(`/add-item/`, {
        method: 'post',
        body: JSON.stringify({ item: item }),
    }).then((res) => res.json()).then(({ success }) => {
        if (success) {
            notyf.success('Elemento añadido')
            getItems()
        }
    })
}

// INIT

getGreeting()
getItems()
