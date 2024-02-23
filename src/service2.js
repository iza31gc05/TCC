document.addEventListener('DOMContentLoaded', () => {
    const forms = [
        { formId: '#comentarioForm4', inputId: '#comentario4', divId: '#comentarios4', localStorageKey: 'comentarios4' },
        { formId: '#comentarioForm5', inputId: '#comentario5', divId: '#comentarios5', localStorageKey: 'comentarios5' },
        { formId: '#comentarioForm6', inputId: '#comentario6', divId: '#comentarios6', localStorageKey: 'comentarios6' }
    ];

    forms.forEach(({ formId, inputId, divId, localStorageKey }) => {
        const form = document.querySelector(formId);
        const comentarioInput = document.querySelector(inputId);
        const comentariosDiv = document.querySelector(divId);
        const comentariosSalvos = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        comentariosSalvos.forEach(comentario => {
            addComment(comentariosDiv, comentario);
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const comentario = comentarioInput.value;
            const dataHora = new Date().toLocaleString();
            addComment(comentariosDiv, `(${dataHora}) ${comentario}`);
            comentariosSalvos.push(`(${dataHora}) ${comentario}`);
            if (comentariosDiv.childNodes.length > 5) {
                comentariosDiv.removeChild(comentariosDiv.firstChild);
                comentariosSalvos.shift();
            }
            localStorage.setItem(localStorageKey, JSON.stringify(comentariosSalvos));
            comentarioInput.value = '';
        });

    function addComment(parent, text) {
        const comentarioParagrafo = document.createElement('p');
        comentarioParagrafo.textContent = text;
        parent.appendChild(comentarioParagrafo);
    }
})})

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("restaurant-form").addEventListener("submit", function(event) {
        event.preventDefault();
      
        var nomeRestaurante = document.getElementById("nome-restaurante").value;
        var endereco = document.getElementById("endereco").value;
        var avaliacao = document.getElementById("avaliacao").value;
        var acessibilidade2 = document.getElementById("acessibilidade2").value;
        var descricao = document.getElementById("descricao").value;
      
        var restauranteInfo = {
          nome: nomeRestaurante,
          endereco: endereco,
          avaliacao: avaliacao,
          acessibilidade: acessibilidade2,
          descricao: descricao
        }
      
        saveRestaurant(restauranteInfo);
      
        // Limpar o formulário após salvar as informações
        document.getElementById("restaurant-form").reset();
      });

    loadSavedRestaurants();
});

function saveRestaurant(restauranteInfo) {
    var savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants')) || [];

    savedRestaurants.push(restauranteInfo);

    localStorage.setItem('savedRestaurants', JSON.stringify(savedRestaurants));

    loadSavedRestaurants();
}

function loadSavedRestaurants() {
    var savedRestaurants = JSON.parse(localStorage.getItem('savedRestaurants')) || [];
    var listaRestaurantes = document.getElementById("saved-restaurants");
    listaRestaurantes.innerHTML = '';

    savedRestaurants.forEach(function(restauranteInfo) {
        var listItem = document.createElement("li");

        var nomeParagraph = document.createElement("p");
        nomeParagraph.textContent = `${restauranteInfo.nome}`;
        nomeParagraph.id = "avtit2";
        listItem.appendChild(nomeParagraph);

        var enderecoParagraph = document.createElement("p");
        enderecoParagraph.textContent = `${restauranteInfo.endereco}`;
        enderecoParagraph.id = "avend";
        listItem.appendChild(enderecoParagraph);

        var avaliacaoParagraph = document.createElement("p");
        avaliacaoParagraph.textContent = `Avaliação: ${restauranteInfo.avaliacao}`;
        avaliacaoParagraph.id = "avend";
        listItem.appendChild(avaliacaoParagraph);

        var acessibilidadeParagraph = document.createElement("p");
        acessibilidadeParagraph.textContent = `${restauranteInfo.acessibilidade}`;
        acessibilidadeParagraph.id = "avh";
        listItem.appendChild(acessibilidadeParagraph);

        var descricaoParagraph = document.createElement("p");
        descricaoParagraph.textContent = ` - ${restauranteInfo.descricao}`;
        descricaoParagraph.id = "avtxt";
        listItem.appendChild(descricaoParagraph);
        
        listaRestaurantes.appendChild(listItem);
    });
}