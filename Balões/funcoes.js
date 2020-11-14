var timerId = null; // variável que armazena a chamada da função timerOut.

function defineJogo(){
	var nivelJogo = document.getElementById('nivelJogo').value;

	window.location.href = "jogo.html?" + nivelJogo; //Muda a URL do Navegador
}

function iniciaJogo(){
	//var url = window.location; - Resgata a URL da página.
	var url = window.location.search; // Resgata a URL da página a partir do "?" 

	var nivelJogo = url.replace("?", ""); // Substitui o primeiro parâmetro pelo segundo.

	var tempoSegundos = 0;

	/* Nível 1 - 120 s;
	 * Nível 2 - 60 s;
	 * Nível 3 - 30 s;
	 */

	switch (nivelJogo){
		case "1":
		tempoSegundos = 120;
		break;

		case "2":
		tempoSegundos = 60;
		break;

		case "3":
		tempoSegundos = 30;
		break;
	} 

	document.getElementById('cronometro').innerHTML = tempoSegundos; // coloca o tempoSegundos como conteúdo do elemento com o id cronometro.

	
	var qtdBaloes = 80;
	criaBaloes (qtdBaloes);

	// imprimir qtde balões inteiros
	document.getElementById("baloesInteiros").innerHTML = qtdBaloes;

	document.getElementById("baloesEstourados").innerHTML = 0;

	contagemTempo(tempoSegundos);
}

function criaBaloes(qtdBaloes){
	for (var i = 0; i <qtdBaloes; i++){
		var balao = document.createElement("img"); // Cria uma tag, definida no parâmetro da função.
		balao.src = "imagens/balao_azul_pequeno.png"; // Determina o atributo src da tag criada.

		balao.style.margin = "10px"; // insere margens nas tags criadas.

		balao.id = 'b' + i; // cria um id na tag criada.


		document.getElementById("cenario").appendChild(balao); // Insere as tags criadas dentro do elemento com a id cenario. 

		balao.onclick = function(){
			estourar(this);
		}
	}
}

function contagemTempo(segundos){
	if (segundos == -1){
		clearTimeout(timerId); // Para a execução da função setTimeOut.
		alert('Fim de jogo, você não estourou todos os balões a tempo!');
		removeEventosBaloes();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	segundos--;
	timerId = setTimeout("contagemTempo("+segundos+")", 1000); // Executa uma função a cada tempo em milissegundos.
}

function estourar(elemento){
	var idBalao = elemento.id;

	document.getElementById(idBalao).setAttribute("onclick", ""); // modifica o elemento no primeiro parâmetro para as configurações no segundo.
	document.getElementById(idBalao).src = "imagens/balao_azul_pequeno_estourado.png"
	pontuacao(1);
}

function pontuacao(acao){
	var baloesInteiros = document.getElementById("baloesInteiros").innerHTML;
	var baloesEstourados = document.getElementById("baloesEstourados").innerHTML;

	baloesEstourados = parseInt (baloesEstourados);
	baloesInteiros = parseInt (baloesInteiros);

	baloesInteiros = baloesInteiros - acao;
	baloesEstourados = baloesEstourados + acao;

	document.getElementById("baloesEstourados").innerHTML = baloesEstourados;

	document.getElementById("baloesInteiros").innerHTML = baloesInteiros;

	situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros){
	if (baloesInteiros == 0){
		alert ("Você venceu, parabéns!");
		clearTimeout(timerId); // Jogo acabou, encerra-se o cronômetro.
	}
}

function removeEventosBaloes() {
    var i = 0; //contado para recuperar balões por id
    
    //percorre o elementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+ i)) {
        //retira o evento onclick do elemento
        document.getElementById('b'+ i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}