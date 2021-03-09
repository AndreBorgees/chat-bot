var app = require('./config/server');

var server = app.listen(80, function () {
    console.log('servidor online');
});

//Tanto requisições HTTP quanto requisições do Webscoket serão interpretadas e recebidas pela porta 80
var io = require('socket.io').listen(server);

//Criando variavel global do socket.io utilizando express, para poder usar nas controllers
app.set('io', io);

//Criando a conexão por Webscoket que ficara ouvindo se existente tentativas de conexão vindas do lado cliente
//o callback dessa função de conexão é a propria conexão em si
io.on('connection', function (socket) {
    console.log('usuario conectou');

    socket.on('disconnect', function () {
        console.log('usuario desconectou');
    });

    /* Dialogo*/

    /* Ouvindo os pedidos de execução vindos do cliente(emit) e pegando as informações vindas dessa função pela variavel data
    (que é o segundo parametro da função emit do lado cliente) do nosso callback */

    socket.on('msgParaServidor', function (data) {
        //emitindo uma mensagem para o cliente como retorno do que estavamos ouvindo, para o evento(ja existente msgParaCliente),(essa primeira aparece no nosso navegador)
        socket.emit('msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        );

        //emitindo uma mensagem para o cliente como retorno do que estavamos ouvindo, para o evento(ja existente msgParaCliente),(essa vai pra todos os usuarios do chat)
        socket.broadcast.emit('msgParaCliente',
            {
                apelido: data.apelido,
                mensagem: data.mensagem
            }
        );

        /* Participantes */

        //se variavel for igual a zero adicionada particpante na conversa, se não o mesmo já existe não fazer nada
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            //emitindo os participantes para o cliente como retorno do que estavamos ouvindo, para o evento(ja existente participantesParaCliente),(essa primeira aparece no nosso navegador)
            socket.emit('participantesParaCliente',
                {
                    apelido: data.apelido
                }
            );

            //emitindo os participantes para o cliente como retorno do que estavamos ouvindo, para o evento(ja existente participantesParaCliente),(essa vai pra todos os usuarios do chat)
            socket.broadcast.emit('participantesParaCliente',
                {
                    apelido: data.apelido
                }
            );
        }


    })
});
