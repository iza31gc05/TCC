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