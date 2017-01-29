// VERIFICAR LOGIN
$('#login').click(function(){
    
    var login = $("#loginInput").val();
    var senha = $("#senhaInput").val();
    
    if(login!="ctmcadastro"&&senha!="ctm99380410"){
    	$("#mensagem").html('<span class="label label-danger">Login ou Senha incorretos</span>');
    }else{
    	$("#mensagem").html('<span class="label label-success">Login e Senha corretos, redirecionando...</span>');
    	location.href="dashboard.html";
    }


});


// SINCRONIA
$('#sincronia').click(function(){
   
   $("#mensagem").html('<span class="label label-danger">Nenhum dado para sincronia</span>');

});


// INICIAR PROCESSOS
function iniciarProcessos(){
  
  // PEGAR NUMERO SEQUENCIAL
  var sequencial = localStorage.getItem("sequencial");	
  var sequencial_mercant = localStorage.getItem("sequencial_mercant");
  var sequencial_bens = localStorage.getItem("sequencial_bens");

  if(!sequencial){
  	 localStorage.setItem("sequencial", 1);
     localStorage.setItem("sequencial_mercant",1);
     localStorage.setItem("sequencial_bens",1);

     localStorage.setItem("chave", 1);
     localStorage.setItem("chave_mercant", 1);
     localStorage.setItem("chave_bens", 1);
  }

  $("#sequencial").html("0000"+sequencial);
  $("#sequencial_mercant").html("0000"+sequencial_mercant);
  $("#sequencial_bens").html("0000"+sequencial_mercant);   

}

// CALCULO DE ÁREA DO TERRENO DO IMOVEL
function calcArea(){

   var frente = $("#frente").val();
   var lateralDireita = $("#lateralDireita").val();
   var lateralEsquerda = $("#lateralEsquerda").val();
   var fundos = $("#fundos").val();

   if(frente==0||lateralDireita==0||lateralEsquerda==0||fundos==0){
    console.log("Nem todos os dados foram preenchidos para o cálculo da área do terreno");
    document.getElementById('areaTotal').disabled = true;
   }else{

        var area = 0;
        
        if(lateralDireita==lateralEsquerda && frente == fundos){

           area = lateralDireita * frente;

        }else{

          var laterais = lateralDireita+lateralEsquerda;
          laterais = laterais / 2;

          var pontas = frente + fundos;
          pontas = pontas / 2;

          area = laterais * pontas;

        } 

        document.getElementById('areaTotal').disabled = false;
        $("#areaTotal").val(area);
        

   }

}


// CALCULO DE ÁREA DO TERRENO DA EDIFICAÇÃO
function calcAreaEdificacao(){

   var frente = $("#med_frente").val();
   var lateralDireita = $("#med_lat_direita").val();
   var lateralEsquerda = $("#med_lat_esque").val();
   var fundos = $("#med_fundos").val();

   if(frente==0||lateralDireita==0||lateralEsquerda==0||fundos==0){
    console.log("Nem todos os dados foram preenchidos para o cálculo da área da edificação");
    document.getElementById('med_area').disabled = true;
   }else{

        var area = 0;
        
        if(lateralDireita==lateralEsquerda && frente == fundos){

           area = lateralDireita * frente;

        }else{

          var laterais = lateralDireita+lateralEsquerda;
          laterais = laterais / 2;

          var pontas = frente + fundos;
          pontas = pontas / 2;

          area = laterais * pontas;

        } 

        document.getElementById('med_area').disabled = false;
        $("#med_area").val(area);
        

   }

}


// PEGAR LATITUDE DA FRENTE DO TERRENO
function localFrente(){

   if( navigator.geolocation )
        {
           // Call getCurrentPosition with success and failure callbacks
           navigator.geolocation.getCurrentPosition( success, fail );
        }
        else
        {
           alert("Esse dispositivo não tem GPS");
        }

}
function success(position)
     {
         var cordenadas = "";  
         cordenadas = position.coords.longitude;
         cordenadas = cordenadas+"###";
         cordenadas = cordenadas + position.coords.latitude;
         $("#frente").val(cordenadas);
     }

function fail()
     {
        alert("Esse dispositivo não tem GPS");
     }


// PEGAR LATITUDE DA LATERAL DIREITA DO TERRENO
function localLatDir(){

   if( navigator.geolocation )
        {
           // Call getCurrentPosition with success and failure callbacks
           navigator.geolocation.getCurrentPosition( success2, fail2 );
        }
        else
        {
           alert("Esse dispositivo não tem GPS");
        }

}
function success2(position)
     {
         var cordenadas = "";  
         cordenadas = position.coords.longitude;
         cordenadas = cordenadas+"###";
         cordenadas = cordenadas + position.coords.latitude;
         $("#lateralDireita").val(cordenadas);
     }

function fail2()
     {
        alert("Esse dispositivo não tem GPS");
     }     



// SALVAR IMOVEL
function salvarImovel(){

   // CARREGAR VALORES

   var distrito = $("#distrito").val();
   var setor = $("#setor").val();
   var quadra = $("#quadra").val();
   var face = $("#face").val();
   var lote = $("#lote").val();
   var unidade = $("#unidade").val();
   var logradouro = $("#logradouro").val();
   var numero = $("#numero").val();
   var bairro = $("#bairro").val();
   var cep = $("#cep").val();
   var complemento = $("#complemento").val();
   var loteamento = $("#loteamento").val();
   var quadro = $("#quadro").val();
   var lote = $("#lote").val();
   var frente = $("#frente").val();
   var lateralDireita = $("#lateralDireita").val();
   var lateralEsquerda = $("#lateralEsquerda").val();
   var fundos = $("#fundos").val();
   var areaTotal = $("#areaTotal").val();
   var situacao_terreno = $("#situacao_terreno").val();
   var topografia = $("#topografia").val();
   var tipo_terreno = $("#tipo_terreno").val();
   var pedologia = $("#pedologia").val();
   var limitacao = $("#limitacao").val();
   var calcada = $("#calcada").val();
   var med_frente = $("#med_frente").val();
   var med_lat_direita = $("#med_lat_direita").val();
   var med_lat_esque = $("#med_lat_esque").val();
   var med_fundos = $("#med_fundos").val();
   var med_area_unidade = $("#med_area_unidade").val();
   var med_area = $("#med_area").val();
   var tipo_edificacao = $("#tipo_edificacao").val();
   var estado_conservacao = $("#estado_conservacao").val();
   var utilizacao_edificacao = $("#utilizacao_edificacao").val();
   var nome_proprietario = $("#nome_proprietario").val();
   var cpf_cnpj = $("#cpf_cnpj").val();

   
   if(areaTotal!=0){

       var chave = parseInt(localStorage.getItem("chave"));

       var chaveIncremento = 0;
       chaveIncremento = parseInt(chave) + 1;

       console.log("Chave incremento: "+chaveIncremento);

       // VERIFICAR SE ESTAMOS ONLINE
       var online = navigator.onLine; 

       if(online) {
          console.log("Estamos online");
       }else{
        console.log("Estamos sem internet");
       }

       localStorage.setItem("chave", chaveIncremento);
        
       var sequencial = parseInt(localStorage.getItem("sequencial"));
       sequencial = parseInt(sequencial) + 1;

       localStorage.setItem("sequencial",sequencial);

       console.log("Número sequencial: "+sequencial);
       

       // SALVAR DADOS NA PERSISTENCIA

       localStorage.setItem("imovel_distrito["+chave+"]", distrito);
       localStorage.setItem("imovel_setor["+chave+"]", setor);
       localStorage.setItem("imovel_quadra["+chave+"]", quadra);
       localStorage.setItem("imovel_face["+chave+"]", face);
       localStorage.setItem("imovel_lote["+chave+"]", lote);
       localStorage.setItem("imovel_unidade["+chave+"]", unidade);
       localStorage.setItem("imovel_logradouro["+chave+"]", logradouro);
       localStorage.setItem("imovel_numero["+chave+"]", numero);
       localStorage.setItem("imovel_bairro["+chave+"]", bairro);
       localStorage.setItem("imovel_cep["+chave+"]", cep);
       localStorage.setItem("imovel_complemento["+chave+"]", complemento);
       localStorage.setItem("imovel_loteamento["+chave+"]", loteamento);
       localStorage.setItem("imovel_quadro["+chave+"]", quadro);
       localStorage.setItem("imovel_lote["+chave+"]", lote);
       localStorage.setItem("imovel_frente["+chave+"]", frente);
       localStorage.setItem("imovel_lateralDireita["+chave+"]", lateralDireita);
       localStorage.setItem("imovel_lateralEsquerda["+chave+"]", lateralEsquerda);
       localStorage.setItem("imovel_fundos["+chave+"]", fundos);
       localStorage.setItem("imovel_areaTotal["+chave+"]", areaTotal);
       localStorage.setItem("imovel_situacao_terreno["+chave+"]", situacao_terreno);
       localStorage.setItem("imovel_topografia["+chave+"]", topografia);
       localStorage.setItem("imovel_tipo_terreno["+chave+"]", tipo_terreno);
       localStorage.setItem("imovel_pedologia["+chave+"]", pedologia);
       localStorage.setItem("imovel_limitacao["+chave+"]", limitacao);
       localStorage.setItem("imovel_calcada["+chave+"]", calcada);
       localStorage.setItem("imovel_med_frente["+chave+"]", med_frente);
       localStorage.setItem("imovel_med_lat_direita["+chave+"]", med_lat_direita);
       localStorage.setItem("imovel_med_lat_esque["+chave+"]", med_lat_esque);
       localStorage.setItem("imovel_med_fundos["+chave+"]", med_fundos);
       localStorage.setItem("imovel_med_area_unidade["+chave+"]", med_area_unidade);
       localStorage.setItem("imovel_med_area["+chave+"]", med_area);
       localStorage.setItem("imovel_tipo_edificacao["+chave+"]", tipo_edificacao);
       localStorage.setItem("imovel_estado_conservacao["+chave+"]", estado_conservacao);
       localStorage.setItem("imovel_utilizacao_edificacao["+chave+"]", utilizacao_edificacao);
       localStorage.setItem("imovel_nome_proprietario["+chave+"]", nome_proprietario);
       localStorage.setItem("imovel_cpf_cnpj["+chave+"]", cpf_cnpj);
       localStorage.setItem("sinc["+chave+"]", "não");
       
       console.log("Dados salvos");

   }else{
    alert("Dados sobre a área do terreno não foram informados!");
   }


}



// SALVAR MERCANTIL
function salvarMercantil(){

  // CARREGAR VALORES
  var inscricao_municipal = $("#inscricao_municipal").val();
  var cim = $("#cim").val();
  var data_cadastro = $("#data_cadastro").val();
  var tipo_contribuinte = $("#tipo_contribuinte").val();
  var razao_social = $("#razao_social").val();
  var nome_fantasia = $("#nome_fantasia").val();
  var cpf_cnpj = $("#cpf_cnpj").val();
  var inscricao_estadual = $("#inscricao_estadual").val();
  var inscricao_imobiliaria = $("#inscricao_imobiliaria").val();
  var tipo_imposto = $("#tipo_imposto").val();
  var logradouro = $("#logradouro").val();
  var numero = $("#numero").val();
  var bairro = $("#bairro").val();
  var cep = $("#cep").val();
  var complemento = $("#complemento").val();
  var observacao = $("#observacao").val();
  var codigo_atividade = $("#codigo_atividade").val();
  var descricao_atividade = $("#descricao_atividade").val();

  var chave = parseInt(localStorage.getItem("chave_mercant"));

  var chaveIncremento = 0;
      chaveIncremento = parseInt(chave) + 1;

  console.log("Chave incremento Mercantil: "+chaveIncremento);

  localStorage.setItem("chave_mercant", chaveIncremento);
        
  var sequencial = parseInt(localStorage.getItem("sequencial_mercant"));
      sequencial = parseInt(sequencial) + 1;

  localStorage.setItem("sequencial_mercant",sequencial);

  console.log("Número sequencial Mercantil: "+sequencial);

  // SALVAR DADOS NA PERSISTENCIA

  localStorage.setItem("inscricao_municipal["+chave+"]", inscricao_municipal);
  localStorage.setItem("cim["+chave+"]", cim);
  localStorage.setItem("data_cadastro["+chave+"]", data_cadastro);
  localStorage.setItem("tipo_contribuinte["+chave+"]", tipo_contribuinte);
  localStorage.setItem("razao_social["+chave+"]", razao_social);
  localStorage.setItem("nome_fantasia["+chave+"]", nome_fantasia);
  localStorage.setItem("cpf_cnpj["+chave+"]", cpf_cnpj);
  localStorage.setItem("inscricao_estadual["+chave+"]", inscricao_estadual);
  localStorage.setItem("inscricao_imobiliaria["+chave+"]", inscricao_imobiliaria);
  localStorage.setItem("tipo_imposto["+chave+"]", tipo_imposto);
  localStorage.setItem("logradouro["+chave+"]", logradouro);
  localStorage.setItem("numero["+chave+"]", numero);
  localStorage.setItem("bairro["+chave+"]", bairro);
  localStorage.setItem("cep["+chave+"]", cep);
  localStorage.setItem("complemento["+chave+"]", complemento);
  localStorage.setItem("observacao["+chave+"]", observacao);
  localStorage.setItem("codigo_atividade["+chave+"]", codigo_atividade);
  localStorage.setItem("descricao_atividade["+chave+"]", descricao_atividade);  
  localStorage.setItem("sinc_mercantil["+chave+"]", "não");

  console.log("Dados salvos Mercantil");

}



// SALVAR DADOS BENS
function salvarBens(){

var n_patrimonio = $("#n_patrimonio").val();
var data_entrada = $("#data_entrada").val();
var tombamento = $("#tombamento").val();
var situacao = $("#situacao").val();
var orgao = $("#orgao").val();
var setor = $("#setor").val();
var unidade = $("#unidade").val();
var natureza = $("#natureza").val();
var origem_do_bem = $("#origem_do_bem").val();
var estado_de_conservacao = $("#estado_de_conservacao").val();
var descriminacao = $("#descriminacao").val();
var especificacao = $("#especificacao").val();
var licitacao = $("#licitacao").val();
var empenho = $("#empenho").val();
var data_compra = $("#data_compra").val();
var data_nota = $("#data_nota").val();
var n_nota = $("#n_nota").val();
var valor_aquisicao = $("#valor_aquisicao").val();
var dotacao = $("#dotacao").val();
var aliquota = $("#aliquota").val();
var qtde_meses = $("#qtde_meses").val();
var valor_anual = $("#valor_anual").val();
var data_ocorrencia = $("#data_ocorrencia").val();
var tipo_ocorrencia = $("#tipo_ocorrencia").val();
var especificacao = $("#especificacao").val();
var laudo_final = $("#laudo_final").val();
var data_transferencia = $("#data_transferencia").val();
var orgao_transferencia = $("#orgao_transferencia").val();
var setor_transferencia = $("#setor_transferencia").val();
var unidade_transferencia = $("#unidade_transferencia").val();

var chave = parseInt(localStorage.getItem("chave_bens"));

  var chaveIncremento = 0;
      chaveIncremento = parseInt(chave) + 1;

  console.log("Chave incremento Bens: "+chaveIncremento);

  localStorage.setItem("chave_bens", chaveIncremento);
        
  var sequencial = parseInt(localStorage.getItem("sequencial_bens"));
      sequencial = parseInt(sequencial) + 1;

  localStorage.setItem("sequencial_bens",sequencial);
  console.log("Número sequencial Bens: "+sequencial); 

  localStorage.setItem("n_patrimonio["+chave+"]", n_patrimonio);
  localStorage.setItem("data_entrada["+chave+"]", data_entrada);
  localStorage.setItem("tombamento["+chave+"]", tombamento);
  localStorage.setItem("situacao["+chave+"]", situacao);
  localStorage.setItem("orgao["+chave+"]", orgao);
  localStorage.setItem("setor["+chave+"]", setor);
  localStorage.setItem("unidade["+chave+"]", unidade);
  localStorage.setItem("natureza["+chave+"]", natureza);
  localStorage.setItem("origem_do_bem["+chave+"]", origem_do_bem);
  localStorage.setItem("estado_de_conservacao["+chave+"]", estado_de_conservacao);
  localStorage.setItem("descriminacao["+chave+"]", descriminacao);
  localStorage.setItem("especificacao["+chave+"]", especificacao);
  localStorage.setItem("licitacao["+chave+"]", licitacao);
  localStorage.setItem("empenho["+chave+"]", empenho);
  localStorage.setItem("data_compra["+chave+"]", data_compra);
  localStorage.setItem("data_nota["+chave+"]", data_nota);
  localStorage.setItem("n_nota["+chave+"]", n_nota);
  localStorage.setItem("valor_aquisicao["+chave+"]", valor_aquisicao);
  localStorage.setItem("dotacao["+chave+"]", dotacao);
  localStorage.setItem("aliquota["+chave+"]", aliquota);
  localStorage.setItem("qtde_meses["+chave+"]", qtde_meses);
  localStorage.setItem("valor_anual["+chave+"]", valor_anual);
  localStorage.setItem("data_ocorrencia["+chave+"]", data_ocorrencia);
  localStorage.setItem("tipo_ocorrencia["+chave+"]", tipo_ocorrencia);
  localStorage.setItem("especificacao["+chave+"]", especificacao);
  localStorage.setItem("laudo_final["+chave+"]", laudo_final);
  localStorage.setItem("data_transferencia["+chave+"]", data_transferencia);
  localStorage.setItem("orgao_transferencia["+chave+"]", orgao_transferencia);
  localStorage.setItem("setor_transferencia["+chave+"]", setor_transferencia);
  localStorage.setItem("unidade_transferencia["+chave+"]", unidade_transferencia);

  localStorage.setItem("sinc_bens["+chave+"]", "não");  

  console.log("Dados salvos Bens");

}