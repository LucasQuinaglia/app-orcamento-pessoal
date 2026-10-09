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
        //bd.gravar(despesa)

        //dialogo de sucesso
        document.getElementById('titulo_modal').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('header').className = 'dialog-header fg-success'
        document.getElementById('body').innerHTML = 'Sua despesa foi registrada!'
        document.getElementById('botao').innerHTML = 'Voltar'
        document.getElementById('botao').className = 'btn-solid theme-success'
        $('#registroDespesa').modal('show')
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