let id = 0

const tarefa = (id, novaTarefa) => `<div id='${id}'>
<p>${novaTarefa}</p>
<input type="checkbox" />
</div>`

function adicionarTarefa(){
    id++
    const novaTarefa = document.getElementById('nome-tarefa').value
    document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa)
}

