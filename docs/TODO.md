# TODO

## AV1

- [x] Criar diagrama de classe conceitual
- [x] Criar caso de uso
- [x] Criar regras
  - [x] Cliente
  - [x] Produto
  - [x] Fornecedor
  - [x] Venda
  - [x] ItemVenda
- [x] Testar regras
  - [x] Cliente
  - [x] Produto
  - [x] Fornecedor
  - [x] Venda
  - [x] ItemVenda
- [x] Insert produto

## AV2

MVP 1:

- [x] Migrar Firebase para NestJS
  - [x] Endpoints
    - [x] Auth
    - [x] Cliente
    - [x] Produto
    - [x] Fornecedor
    - [x] Venda
    - [x] ItemVenda
- [ ] Testar endpoints e regras
  - [x] Auth
    - Cadastrar
    - Entrar
  - [ ] Cliente
    - Pesquisar por id
    - Pesquisar por parte do nome (unaccent, normalized)
    - Atualizar endereço, nome. O resto não será salvo.
  - [ ] Produto
    - Criar produto (validar imagens base64 e afins)
    - Editar produto
    - Pesquisar por id
    - Pesquisar por parte do nome (unaccent, normalized)
    - Pesquisar por demais campos
  - [ ] Fornecedor
    - Criar fornecedor
    - Editar fornecedor
  - [ ] Venda
    - Criar venda com 1+ itemVenda aninhado (obrigatório)
    - Pesquisar Venda
  - [ ] ItemVenda
    - Pesquisar ItemVenda
    - Não hé método criar ou deletar, a criação é feia no Venda
