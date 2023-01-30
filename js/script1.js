//AJAX (HXMLHttpRequest) -- Async Javascript and XML

const input = document.querySelector('input[name=github_user]');
const btn = document.querySelector('#btn');
const div = document.querySelector('#app');

btn.onclick = function() {
    //Limpar o conteudo da div;
    div.innerHTML = '';

    //Instanciando objeto ajax
    let ajax = new XMLHttpRequest();

    //Abrir uma conexao
    ajax.open('GET', `https://api.github.com/users/${input.value}`)

    //Enviar a requisiçao
    ajax.send(null) //Nao estamos enviando dados, apenas pegando (get)

    ajax.onreadystatechange = function() {
        //Criar elemento span
        let spanNone = document.createElement('span');

        //Criar a variavel nome
        let txtNome= '';

        /*
        ajax.readyState 0 => Antes da conexão ser aberta
        ajax.readyState 1 => Após abrir conexao
        ajax.readyState 2 => headers foram recebidos
        ajax.readyState 3 => Carregando o corpo de requisição
        ajax.readyState 4 => O conteudo está pronto p uso
        */

        if(ajax.readyState === 4 ) {
            if(ajax.status === 200) {
                //Transformar os dados JSON para ARRAY
                usuario = JSON.parse(ajax.responseText);

                //Se o usuario possui nome
                if(usuario['name'] !== null) {
                    txtNome = document.createTextNode(usuario['name']);

                    let img = document.createElement('img');
                    img.setAttribute('src', usuario['avatar_url'])
                    img.setAttribute('alt', usuario['name'])
                    img.setAttribute('width', '45px')
                    img.setAttribute('alt', '45px')

                    div.appendChild(img)
                } else {
                    txtNome = document.createTextNode(`O usuário ${input.value} não tem nome`);
                }
                //Adicionar o texto a div
                spanNone.appendChild(txtNome)
                div.appendChild(txtNome)
                input.value = ''
            } else {
                txtNome = document.createTextNode(`Não encontrei o usuário ${input.value}`);
                spanNone.appendChild(txtNome)
                div.appendChild(txtNome)

            }
        }
    }
}