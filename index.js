let id = 0

const tarefa = (id, novaTarefa) => `<div>
<p id='${id}'>${novaTarefa}</p>
<input type="checkbox" />
<button onclick="removerTarefa(${id})">Remover</button>
</div>`

function exibirLista() {
    console.log('called')
    const tarefas = JSON.parse(localStorage.getItem('lista-tarefas'))
    if(tarefas){
        tarefas.forEach(tarefaListada => {
            id++
            document.querySelector('#lista-tarefas').innerHTML += tarefa(id, tarefaListada)
        })
    }
}

const validarTarefa = (novaTarefa) => {
    let tarefaExistente = false
    const listaTarefas = JSON.parse(localStorage.getItem('lista-tarefas'))

    listaTarefas.map(tarefa => {
        if(tarefa === novaTarefa){
            tarefaExistente = true
            alert('Tarefa já existente')
        }
    })

    return tarefaExistente
}

function adicionarTarefa(){
    id++
    const novaTarefa = document.getElementById('nome-tarefa').value
    const listaTarefas = localStorage.getItem('lista-tarefas')
    if(validarTarefa(novaTarefa)){
        return
    }

    document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa)

    if(listaTarefas){
        const novaLista = JSON.parse(listaTarefas)
        novaLista.push(novaTarefa)
        localStorage.setItem('lista-tarefas', JSON.stringify(novaLista))
    } else {
        localStorage.setItem('lista-tarefas', JSON.stringify([novaTarefa]))
    }
}

const removerTarefa = (id) => {
    const tarefaDeletada = document.getElementById(id).innerHTML
    const listaTarefas = JSON.parse(localStorage.getItem('lista-tarefas'))
    const novaListaTarefa = listaTarefas.filter(tarefa => tarefa !== tarefaDeletada)
    localStorage.setItem('lista-tarefas', JSON.stringify(novaListaTarefa))
    document.querySelector('#lista-tarefas').innerHTML = ''
    exibirLista()
}

exibirLista()
