document.addEventListener('DOMContentLoaded', () => {
    const forms = [
        { formId: '#comentarioForm', inputId: '#comentario', divId: '#comentarios', localStorageKey: 'comentarios' },
        { formId: '#comentarioForm2', inputId: '#comentario2', divId: '#comentarios2', localStorageKey: 'comentarios2' },
        { formId: '#comentarioForm3', inputId: '#comentario3', divId: '#comentarios3', localStorageKey: 'comentarios3' }
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
    document.getElementById("tourist-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var nomePonto = document.getElementById("nome-ponto").value;
        var endereco = document.getElementById("endereco").value;
        var avaliacao = document.getElementById("avaliacao").value;
        var acessibilidade2 = document.getElementById("acessibilidade2").options[document.getElementById("acessibilidade").selectedIndex].value;
        var descricao = document.getElementById("descricao").value;

        var pontoTuristicoInfo = {
            nome: nomePonto,
            endereco: endereco,
            avaliacao: avaliacao,
            acessibilidade: acessibilidade2,
            descricao: descricao
        };

        saveTourist(pontoTuristicoInfo);

        // Limpar o formulário após salvar as informações
        document.getElementById("tourist-form").reset();

        

    });

    loadSavedTourists();
});

function saveTourist(pontoTuristicoInfo) {
    // Verificar se já há pontos turísticos salvos no armazenamento local
    var savedTourists = JSON.parse(localStorage.getItem('savedTourists')) || [];

    // Adicionar o novo ponto turístico à lista
    savedTourists.push(pontoTuristicoInfo);

    // Salvar a lista atualizada no armazenamento local
    localStorage.setItem('savedTourists', JSON.stringify(savedTourists));

    // Atualizar a lista de pontos turísticos na página
    loadSavedTourists();
}

function loadSavedTourists() {
    var savedTourists = JSON.parse(localStorage.getItem('savedTourists')) || [];
    var listaPontosTuristicos = document.getElementById("saved-tourists");
    listaPontosTuristicos.innerHTML = ''; // Limpar a lista antes de adicionar os itens salvos
    savedTourists.class = "barra";

    savedTourists.forEach(function(pontoTuristicoInfo, ) {
        var listItem = document.createElement("li");

        var nomeParagraph = document.createElement("p");
        nomeParagraph.textContent = `${pontoTuristicoInfo.nome}`;
        nomeParagraph.id = "avtit2";
        listItem.appendChild(nomeParagraph);

        var enderecoParagraph = document.createElement("p");
        enderecoParagraph.textContent = `${pontoTuristicoInfo.endereco}`;
        enderecoParagraph.id = "avend";
        listItem.appendChild(enderecoParagraph);

        var avaliacaoParagraph = document.createElement("p");
        avaliacaoParagraph.textContent = `Avaliação: ${pontoTuristicoInfo.avaliacao}`;
        avaliacaoParagraph.id = "avend";
        listItem.appendChild(avaliacaoParagraph);

        var acessibilidadeParagraph = document.createElement("p");
        acessibilidadeParagraph.textContent = `${pontoTuristicoInfo.acessibilidade}`;
        acessibilidadeParagraph.id = "avh";
        listItem.appendChild(acessibilidadeParagraph);

        var descricaoParagraph = document.createElement("p");
        descricaoParagraph.textContent = ` - ${pontoTuristicoInfo.descricao}`;
        descricaoParagraph.id = "avtxt";
        listItem.appendChild(descricaoParagraph);

        listaPontosTuristicos.appendChild(listItem);

    });
}