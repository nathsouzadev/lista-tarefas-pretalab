let id = 0

const dados = {
    pegarTarefas: () => JSON.parse(localStorage.getItem('lista-tarefas')),
    editarTarefas: (listaTarefas) => localStorage.setItem('lista-tarefas', JSON.stringify(listaTarefas))
}

const tarefa = (id, novaTarefa) => `<div>
<p id='${id}'>
${novaTarefa.finalizada ? `<strike id="strike${id}">` : ''}
${novaTarefa.tarefa}
${novaTarefa.finalizada ? '</strike>' : ''}
</p>
<input type="checkbox" ${novaTarefa.finalizada ? 'checked' : ''} onchange="marcarTarefa(${id})"/>
<button onclick="removerTarefa(${id})">Remover</button>
</div>`

const marcarTarefa = (id) => {
    const strike = document.getElementById(`strike${id}`)
    const listaTarefas = dados.pegarTarefas()
    console.log(strike)

    if(strike){
        document.getElementById(id).innerHTML = strike.innerHTML
        const tarefaPendente = document.getElementById(id).innerHTML.replace(/\\n/g, '')
        console.log(tarefaPendente)
        // mudarStatusTarefa(String(tarefaPendente), false)
    } else {
        const tarefaConcluida = document.getElementById(id).innerHTML
        document.getElementById(id).innerHTML = `<strike id='strike${id}'>${tarefaConcluida}</strike>`
        const index = listaTarefas.findIndex(tarefaListada => tarefaListada.tarefa === tarefaConcluida)
        listaTarefas[index].finalizada = true
        dados.editarTarefas(listaTarefas)
    }
}

const mudarStatusTarefa = (tarefa, status) => {
    const index = listaTarefas.findIndex(tarefaListada => tarefaListada.tarefa === tarefa)
    listaTarefas[index].finalizada = status
    dados.editarTarefas(listaTarefas)
}

function exibirLista() {
    const tarefas = dados.pegarTarefas()
    if(tarefas){
        tarefas.forEach(tarefaListada => {
            id++
            document.querySelector('#lista-tarefas').innerHTML += tarefa(id, tarefaListada)
        })
    }
}

const validarTarefa = (novaTarefa) => {
    let tarefaExistente = false
    const listaTarefas = dados.pegarTarefas()

    if(listaTarefas){
        listaTarefas.map(tarefa => {
            if(tarefa.tarefa === novaTarefa.tarefa){
                tarefaExistente = true
                alert('Tarefa já existente')
            }
        })
    
        return tarefaExistente
    }
}

function adicionarTarefa(){
    id++
    const novaTarefa = {
        tarefa: document.getElementById('nome-tarefa').value,
        finalizada: false
    }
    
    const listaTarefas = localStorage.getItem('lista-tarefas')
    if(validarTarefa(novaTarefa)){
        return
    }

    document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa)

    if(listaTarefas){
        const novaLista = JSON.parse(listaTarefas)
        novaLista.push(novaTarefa)
        dados.editarTarefas(novaLista)
    } else {
        dados.editarTarefas([novaTarefa])
    }
}

const removerTarefa = (id) => {
    const tarefaDeletada = document.getElementById(id).innerHTML
    const listaTarefas = dados.pegarTarefas()
    const novaListaTarefa = listaTarefas.filter(tarefa => tarefa.tarefa !== tarefaDeletada)
    dados.editarTarefas(novaListaTarefa)
    document.querySelector('#lista-tarefas').innerHTML = ''
    exibirLista()
}

exibirLista()
