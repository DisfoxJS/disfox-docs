Disfox é um framework para potencializar o uso da biblioteca **Discord.js**, projetado para fornecer automação, organização e praticidade no desenvolvimento de aplicações Discord.

## Por que utilizar o Disfox?

### 1. Organização

O Disfox propõe uma arquitetura estrutural para o código, tornando aplicações mais organizadas, legíveis e fáceis de manter.

Seu objetivo é reduzir o excesso de callbacks, escopos desnecessários e estruturas repetitivas, substituindo-os por serviços, classes e funções com responsabilidades bem definidas.

Isso permite que projetos cresçam de forma saudável sem comprometer a manutenção do código.

---

### 2. Simplicidade

Sem o uso do Disfox, criar uma aplicação simples capaz de registrar e executar comandos pode exigir uma quantidade considerável de código e configuração.

Para resolver esse problema, o Disfox oferece o **SlashService**.

O **SlashService** é um serviço que disponibiliza diversas funcionalidades relacionadas aos comandos Slash do Discord, como:

- Extração automática de arquivos de diretórios relacionados a comandos Slash.
- Conversão automática de estruturas do modelo Disfox para formatos compatíveis com o **Discord.js**.
- Validação inteligente de estruturas inválidas, prevenindo erros futuros de runtime.
- Configurações avançadas de extração e conversão, oferecendo total controle ao desenvolvedor.

Além disso, o Disfox oferece outros serviços úteis, como o **EventService**, que disponibiliza recursos semelhantes voltados ao gerenciamento de eventos do Discord.

---

### 3. Automação

O Disfox introduz uma poderosa ferramenta de automação chamada **BehaviorTables**.

As BehaviorTables fornecem um sistema declarativo de comportamentos para a aplicação, reduzindo significativamente a necessidade de criar grandes blocos de lógica para permissões, restrições e validações.

Por exemplo, é possível restringir ou permitir o uso de determinados comandos Slash para usuários, cargos ou contextos específicos de forma simples e organizada.

As BehaviorTables podem ser facilmente integradas ao modelo estrutural do Disfox e, futuramente, terão suporte expandido para eventos e outros setores do Discord.js.

---

### 4. Pensado para TypeScript

O Disfox foi projetado para funcionar tanto com JavaScript quanto com TypeScript.

Com suporte completo à tipagem, o framework proporciona maior segurança, produtividade e previsibilidade durante o desenvolvimento.

---

### 5. Performance

Embora ofereça diversas camadas de automação e organização, o Disfox busca manter um baixo custo operacional.

Nosso objetivo é garantir que os recursos do framework agreguem produtividade sem se tornarem um gargalo para a aplicação.

---

### 6. Contribuição Open Source

O Disfox é um projeto open source e está sempre aberto a sugestões, discussões, correções e novas ideias.

A comunidade participa ativamente do desenvolvimento do framework, ajudando a identificar problemas, propor melhorias e evoluir o projeto continuamente.

Nossa comunidade está presente principalmente em nosso servidor do Discord.

E também, nosso código-fonte está sempre disponívle em nosso [Github](https://github.com/DisfoxJS/disfox).

> Last updated: June 18, 2026