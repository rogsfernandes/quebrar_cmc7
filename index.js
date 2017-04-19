var codigoLido = '422009790180005215200001162098';

console.log('********** INICIO ************');
console.log('VALOR ORIGINAL: ' + codigoLido);

function obterDadosPorCmc7(codigo) {
    var dados = {};

    codigo = codigo.replace(/<|>| |:/g, "");

    dados.banco = codigo.substring(0, 3);
    dados.agencia = codigo.substring(3, 7);
    dados.dv2 = codigo.substring(7, 8);
    dados.comp = codigo.substring(8, 11);
    dados.numeroCheque = codigo.substring(11, 17);
    dados.tipificacao = codigo.substring(17, 18);
    dados.dv1 = codigo.substring(18, 19);
    dados.serie = codigo.substring(19, 23);
    dados.numeroConta = codigo.substring(23, 29);
    dados.dv3 = codigo.substring(29, 30);

    dados.c1 = calcularModulo11(dados.comp + dados.banco + dados.agencia);
    dados.c2 = calcularModulo11("0000" + dados.numeroConta);
    dados.c3 = calcularModulo11(dados.numeroCheque);

    if (dados.c1 && dados.c2 && dados.c3) {
        return dados;
    } else {
        return undefined;
    }
}

function calcularModulo11(numero) {
    if (numero.length > 16) {
        throw new Error("Campo 'numero' possui mais que 16 caracteres.");
    }

    var padraoMD11 = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9];
    var sequenciaMD11 = [];
    var soma = 0;
    var resto = 0;
    var digitoVerificador = 0;

    var sequenciaNumeros = numero.split('').map(function (x) {
        return parseInt(x, 10);
    });

    for (var x = 0; x < numero.length; x++) {
        sequenciaMD11.push(padraoMD11[x]);
    }

    sequenciaMD11 = sequenciaMD11.reverse();

    for (var y = 0; y < numero.length; y++) {
        soma += sequenciaMD11[y] * sequenciaNumeros[y];
    }

    resto = soma % 11;
    digitoVerificador = 11 - resto;

    if (digitoVerificador == 0 || digitoVerificador == 10) {
        digitoVerificador = 0;
    }

    return digitoVerificador;
}

var dados = obterDadosPorCmc7(codigoLido);

console.log(`Banco = ${dados.banco}`);
console.log(`Agência = ${dados.agencia}`);
console.log(`DV2 = ${dados.dv2}`);
console.log(`Compe = ${dados.comp}`);
console.log(`Número do Cheque = ${dados.numeroCheque}`);
console.log(`Tipificação = ${dados.tipificacao}`);
console.log(`DV1 = ${dados.dv1}`);
console.log(`Série = ${dados.serie}`);
console.log(`Número da Conta = ${dados.numeroConta}`);
console.log(`DV3 = ${dados.dv3}`);
console.log(`C1 = ${dados.c1}`);
console.log(`C2 = ${dados.c2}`);
console.log(`C3 = ${dados.c3}`);

console.log('************ FIM *************');