var rodada = 1;
var matrizJogo = Array(3);
matrizJogo[0] = Array(3);
matrizJogo[1] = Array(3);
matrizJogo[2] = Array(3);

matrizJogo[0][0] = 0;
matrizJogo[0][1] = 0;
matrizJogo[0][2] = 0;
matrizJogo[1][0] = 0;
matrizJogo[1][1] = 0;
matrizJogo[1][2] = 0;
matrizJogo[2][0] = 0;
matrizJogo[2][1] = 0;
matrizJogo[2][2] = 0;

$(document).ready(function(){

	$('#iniciarJogo').click(function(){

		if ($("#apelidoJogador1").val() == ""){
			alert("Insira o apelido do Jogador 1!");
			return false;
		}

		if ($("#apelidoJogador2").val() == ""){
			alert("Insira o apelido do Jogador 2!");
			return false;
		}

		$("#jogador1").html($("#apelidoJogador1").val());
		$("#jogador2").html($("#apelidoJogador2").val());

		$("#palcojogo").show();
		$("#paginainicial").hide();

	});

	$(".jogada").click(function(){
		var idCampoClicado = this.id;
		$("#" + idCampoClicado).off();
		jogada (idCampoClicado)
	});

	function jogada (id){
		var icone = "";
		var ponto = 0;

		if (rodada % 2 == 1){
			ponto = -1;
			icone = "url(\"imagens/marcacao_1.png\")"
		}

		else {
			ponto = 1;
			icone = "url(\"imagens/marcacao_2.png\")"
		}

		rodada++;

		$("#" + id).css("background-image", icone);

		var linhaColuna = id.split("");

		if (linhaColuna[0] == 'a'){
			linhaColuna[0] = 0;
		}

		else if (linhaColuna[0] == 'b'){
			linhaColuna[0] = 1;
		}

		else {
			linhaColuna[0] = 2;
		}

		linhaColuna[1]--;

		matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto;
		verificaCombinacao();
	}

	function verificaCombinacao(){

		var pontos = 0;

		//verifica na horizontal
		for (var j = 0; j < 3; j++){
			for (var i = 0; i < 3; i++){
				pontos += matrizJogo[j][i];
			}

			ganhador(pontos);
			pontos = 0;
		}

		pontos = 0;

		//verifica na vertical
		for (var j = 0; j < 3; j++){
			for (var i = 0; i < 3; i++){
				pontos += matrizJogo[i][j];
			}

			ganhador(pontos);
			pontos = 0;
		}

		//verifica nas diagonais
		pontos = matrizJogo[0][0] + matrizJogo[1][1] + matrizJogo[2][2];
		ganhador(pontos);

		pontos = matrizJogo[0][2] + matrizJogo[1][1] + matrizJogo[2][0];
		ganhador(pontos);
	}

	function ganhador(pontos){
		if (pontos == -3){
			alert($("#apelidoJogador1").val() + " venceu!");
			$(".jogada").off();
		}

		if (pontos == 3){
			alert ($("#apelidoJogador2").val() +" venceu!");
			$(".jogada").off();
		}
	}
});