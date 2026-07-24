# As duas versões rodando lado a lado

Sim, dá — arquivos com nomes diferentes convivem sem problema. O que precisou
de cuidado foi o *service worker* (o cache offline) e a identidade de
instalação do PWA, porque esses são compartilhados pela pasta inteira.

## Suba TODOS estes arquivos na raiz do repositório

| Arquivo | O que é |
|---|---|
| `afinador-precisao-violao.html` | **Completa** — harmônico da 12ª casa + calibração |
| `afinador-simples.html` | **Simples** — só corda solta (a versão antiga) |
| `sw.js` | cache das duas · já vem como `afinador-v3` |
| `afinador.webmanifest` | instalação da completa |
| `afinador-simples.webmanifest` | instalação da simples |
| `icon-192.png` `icon-512.png` `icon-512-maskable.png` | ícone da simples |
| `icon-plus-192.png` `icon-plus-512.png` `icon-plus-512-maskable.png` | ícone da completa (com selo **+**) |

São 10 arquivos — arraste todos de uma vez, é um commit só. Os três
`icon-*.png` sem "plus" você já subiu antes; pode subir de novo sem problema.

## Os dois endereços

**Completa** (a que já está instalada no seu celular — ela se atualiza sozinha):
`https://rapososidney.github.io/Quizes-Musicais-Teste/afinador-precisao-violao.html`

**Simples**:
`https://rapososidney.github.io/Quizes-Musicais-Teste/afinador-simples.html`

---

## Como ficam no celular

Cada endereço instala como um app separado, com ícone próprio:

- **Afinador+** (ícone com selo **+**) → versão completa
- **Afinador** (ícone liso) → versão simples

Os dois funcionam offline depois da primeira abertura. Dá para ter os dois
instalados no mesmo aparelho ao mesmo tempo.

### Por que eu mantive o nome do arquivo da versão completa

O app que você já instalou aponta para `afinador-precisao-violao.html`. Se eu
renomeasse esse arquivo, o ícone no seu celular apontaria para o nada. Mantendo
o nome, ele simplesmente **se atualiza** para a versão com harmônico — e o nome
embaixo do ícone muda de "Afinador" para "Afinador+".

---

## Qual mandar para quem

- **Alunos** → o link da **simples**. Menos botões, menos chance de alguém se
  perder no painel de calibração. Faz o serviço.
- **Você** → a **completa**, com o modo harmônico e a medição de
  inarmonicidade.

---

## Detalhes que evitam dor de cabeça

- **Os quizzes não são afetados.** O service worker só intercepta os arquivos
  listados no `sw.js`; todo o resto do repositório continua indo pela rede
  normalmente.
- **Atualizou algum dos dois?** Suba o HTML novo e mude `afinador-v3` para
  `afinador-v4` no `sw.js`. Sem isso o celular continua servindo o arquivo
  velho do cache. É o passo que mais gente esquece.
- **Depois do commit**, no celular: feche o app e abra de novo. Às vezes é
  preciso abrir duas vezes — na primeira ele baixa a versão nova, na segunda
  já entra com ela.
- **Não apareceu "Instalar app" na versão simples?** Confirme que o
  `afinador-simples.webmanifest` subiu junto. Recarregue a página uma vez.
