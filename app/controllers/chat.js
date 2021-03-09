module.exports.iniciaChat = function(apllication, req, res) {

    //Pegando os dados vindos no corpo da nossa requisição
    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    var erros = req.validationErrors();

    if(erros){
        res.render("index.ejs", {validacao: erros});
        return;
    }

    /*Recuperando a variavel global do express para utulizar a função emit que faz um pedido de execução no cliente com alguma ação*/
    apllication.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat '}
    )

    res.render("chat.ejs", {dadosForm: dadosForm});
}