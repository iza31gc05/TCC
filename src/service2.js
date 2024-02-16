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

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir comentários';
        botaoExcluir.classList.add('excluir');
        comentariosDiv.appendChild(botaoExcluir);

        botaoExcluir.addEventListener('click', () => {
            comentariosSalvos.length = 0;
            localStorage.setItem(localStorageKey, JSON.stringify(comentariosSalvos));
            while (comentariosDiv.firstChild) {
                comentariosDiv.removeChild(comentariosDiv.firstChild);
            }
        });
    });

    function addComment(parent, text) {
        const comentarioParagrafo = document.createElement('p');
        comentarioParagrafo.textContent = text;
        parent.appendChild(comentarioParagrafo);
    }
});