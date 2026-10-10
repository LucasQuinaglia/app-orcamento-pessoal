class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === '' || this[i] === null) {
                return false
            }
        }
        return true
    }
}

//por enquanto sera usado o localstorage do browser para manter informacoes
class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProxId() {
        let proxId = localStorage.getItem('id')
        return parseInt(proxId) + 1
    }

    gravar(d) {
        let id = this.getProxId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarRegistros() {
        //array despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recupera todos os registros no localStorage
        for (let i = 1; i <= id; i++) {
            //recupera despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //validar indices removidos
            if (despesa === null) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarRegistros()

        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesasFiltradas
    }
}

let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)

        //dialogo de sucesso
        document.getElementById('titulo_modal').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('header').className = 'dialog-header fg-success'
        document.getElementById('body').innerHTML = 'Sua despesa foi registrada!'
        document.getElementById('botao').innerHTML = 'Voltar'
        document.getElementById('botao').className = 'btn-solid theme-success'
        $('#registroDespesa').modal('show')

        //limpa os campos
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        //dialogo de erro
        document.getElementById('titulo_modal').innerHTML = 'Erro na gravacao'
        document.getElementById('header').className = 'dialog-header fg-danger'
        document.getElementById('body').innerHTML = 'Por favor, preencha todos os campos.'
        document.getElementById('botao').innerHTML = 'Corrigir'
        document.getElementById('botao').className = 'btn-solid theme-danger'
        $('#registroDespesa').modal('show')

    }

}

function recuperarDespesas(despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarRegistros()
    }

    var listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function (d) {
        //insere linhas (tr)
        let linha = listaDespesas.insertRow()

        //cria colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajusta tipo
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentacao'
                break
            case '2': d.tipo = 'Educacao'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saude'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })

}

function pesquisarRegistro() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.recuperarDespesas(despesas, true)
}