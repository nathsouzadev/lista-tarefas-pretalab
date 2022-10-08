let id = 0

const tarefa = (id) => `<div id='${id}'>
<p>Tarefa</p>
<input type="checkbox" />
</div>`

function adicionarTarefa(){
    id++
    document.querySelector('#lista-tarefas').innerHTML += tarefa(id)
}

