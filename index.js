let id = 0

const tarefa = (id, novaTarefa) => `<div id='${id}'>
<p>${novaTarefa}</p>
<input type="checkbox" />
</div>`

function exibirLista() {
    id++
    const tarefas = JSON.parse(localStorage.getItem('lista-tarefas'))
    if(tarefas){
        tarefas.forEach(tarefaListada => {
            document.querySelector('#lista-tarefas').innerHTML += tarefa(id, tarefaListada)
        })
    }
}

function adicionarTarefa(){
    id++
    const novaTarefa = document.getElementById('nome-tarefa').value
    document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa)
    const listaTarefas = localStorage.getItem('lista-tarefas')
    if(listaTarefas){
        const novaLista = JSON.parse(listaTarefas)
        novaLista.push(novaTarefa)
        localStorage.setItem('lista-tarefas', JSON.stringify(novaLista))
    } else {
        localStorage.setItem('lista-tarefas', JSON.stringify([novaTarefa]))
    }
}

exibirLista()
