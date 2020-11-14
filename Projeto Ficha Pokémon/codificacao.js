$(document).ready(function(){
	var numeroAbaAtual = 1; // Esta variável guardará a aba ativa no momento. Por padrão, a primeira aba será sempre a ativa quando a página carrega.
	$("#pokemon-" + numeroAbaAtual).css("visibility", "visible"); //Todas as abas são carregadas invisível. Este comando faz a Aba 1 ficar visível.
	$("#aba-" + numeroAbaAtual).css("background-color", "#83b2d4");


	/*====SISTEMA DE ABAS====*/
	$(".abas").click(function(){ // A função é chamada toda vez que alguma das abas for clicada.
		var stringAbaId = $(this).attr("id"); // Variável responsável por identificar qual o id da aba que foi clicada.

		var numeroAba = stringAbaId.substring(stringAbaId.indexOf("-")+1, stringAbaId.length);
		//Essa variável vai pegar a substring do Id, identificado pela stringAbaId, começando a partir da primeira posição após o caracter "-" e indo até o último caracter. O objetivo é deixar esta instrução dinâmica para mais usos do tipo.

		if (numeroAba != numeroAbaAtual){
			$("#pokemon-" + numeroAbaAtual).css("visibility", "hidden");
			$("#aba-" + numeroAbaAtual).css("background-color", "#007bd4");
			$("#pokemon-" + numeroAba).css("visibility", "visible");
			$("#aba-" + numeroAba).css("background-color", "#83b2d4");

			// Caso a aba seja trocada no processo de editar Exp, ao voltar para esta, a edição não estará visível.
			sairModoEdicao(numeroAba);
			numeroAbaAtual = numeroAba;
		}
	});


	/*====EDIÇÃO DE EXPERIÊNCIA====*/
	$(".exp-atual").dblclick(function(){
		$("#exp-atual-" + numeroAbaAtual).css("display", "none");
		$("#editar-exp-" + numeroAbaAtual).css("display", "block");
		$("#cancelar-alteracoes-" + numeroAbaAtual).css("display", "inline");
		$("#aplicar-alteracoes-" + numeroAbaAtual).css("display", "inline");

		expAtual = parseInt($("#exp-atual-" + numeroAbaAtual).text()); // Variável responsável por pegar a experiência atual do Pokémon (convertido para Int).

		$("#editar-exp-" + numeroAbaAtual).val(expAtual); // Define o valor default do input como sendo a experiência atual do Pokémon.

		//Ativa-se ao se confirmar a alteração de exp.
		$("#aplicar-alteracoes-" + numeroAbaAtual).click(function(){

			//Pega a maior experiência possível para aquele nível.
			expMaxima = parseInt($("#exp-max-" + numeroAbaAtual).text());

			expModificada = $("#editar-exp-" + numeroAbaAtual).val();

			//O valor atual da experiência não pode ser igual e nem maior que a experiência máxima.
			if (expModificada >= expMaxima){
				expModificada = expMaxima-1;
			}

			//Modifica o valor da experiência atual.
			$("#exp-atual-" + numeroAbaAtual).text(expModificada);

			//Cálculo da porcentagem de exp atual em relação à máxima para que a barra se mova.
			var porcentagemExp = (expModificada/expMaxima)*100;

			//Move a barra de experiência atual proporcionalmente em relação à Exp Máxima.
			$("#barra-exp-atual-" + numeroAbaAtual).animate({
				width: porcentagemExp + "%"
			}, 1000);

			sairModoEdicao(numeroAbaAtual);
		});

		//Ativa-se ao cancelar a alteração de exp
		$("#cancelar-alteracoes-" + numeroAbaAtual).click(function(){
			sairModoEdicao(numeroAbaAtual);
		});
	});
});

function sairModoEdicao(numeroAbaAtual){
	// Modifica os estados de todos os elementos envolvidos na edição, sumindo com os elementos de edição e trazendo de volta o elemento de apenas leitura.
	$("#exp-atual-" + numeroAbaAtual).css("display", "block");
	$("#editar-exp-" + numeroAbaAtual).css("display", "none");
	$("#cancelar-alteracoes-" + numeroAbaAtual).css("display", "none");
	$("#aplicar-alteracoes-" + numeroAbaAtual).css("display", "none");
}