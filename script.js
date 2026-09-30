const botoes = document.querySelectorAll(".botao");
const itensCarrinho = document.querySelector("#itens-carrinho");
const totalCarrinho = document.querySelector("#total-carrinho");
const carrinho = [];

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const prato = botao.closest(".prato");
        const nome = prato.querySelector("h3").textContent;
        const precoTexto = prato.querySelector(".preco").textContent;
        const preco = Number(precoTexto.replace("R$", "").replace(",", ".").trim());

        const produto = carrinho.find(function(item) {
            return item.nome === nome;
        });

        if (produto) {
            produto.quantidade++;
        } else {
            carrinho.push({
                nome: nome,
                preco: preco,
                quantidade: 1
            });
        }

        atualizarCarrinho();
    });
});

function atualizarCarrinho() {
    itensCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach(function(produto, indice) {
        total += produto.preco * produto.quantidade;

        itensCarrinho.innerHTML += `
            <div class="item-carrinho">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
                <div class="controle-quantidade">
                    <button class="diminuir" data-indice="${indice}">-</button>
                    <span>${produto.quantidade}</span>
                    <button class="aumentar" data-indice="${indice}">+</button>
                </div>
            </div>
        `;
    });

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;

    document.querySelectorAll(".aumentar").forEach(function(botao) {
        botao.addEventListener("click", function() {
            const indice = botao.dataset.indice;
            carrinho[indice].quantidade++;
            atualizarCarrinho();
        });
    });

    document.querySelectorAll(".diminuir").forEach(function(botao) {
        botao.addEventListener("click", function() {
            const indice = botao.dataset.indice;
            carrinho[indice].quantidade--;

            if (carrinho[indice].quantidade === 0) {
                carrinho.splice(indice, 1);
            }

            atualizarCarrinho();
        });
    });
}