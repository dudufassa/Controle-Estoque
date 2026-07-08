# 📦 Gestão de Produtos - Controle de Estoque e Vendas

Um sistema web moderno e intuitivo para gerenciar estoque de produtos, registrar vendas e gerar relatórios detalhados com histórico de fechamentos mensais.

## ✨ Funcionalidades Principais

### 📊 Dashboard em Tempo Real
- **Total em Estoque**: Visualização instantânea da quantidade total de produtos
- **Produtos Vendidos**: Contador de vendas do mês atual
- **Vendas do Mês**: Faturamento total com atualização automática

### 📝 Cadastro de Produtos
- Adicionar produtos com nome, quantidade e preço unitário
- Interface intuitiva e responsiva
- Validação de dados em tempo real
- Armazenamento persistente no navegador

### 🛒 Registro de Vendas
- **Modal flutuante** para registrar vendas de forma rápida
- Campos customizáveis:
  - Nome do cliente (opcional)
  - Valor da venda (customizável)
  - Observações sobre a venda
- Registra automaticamente data, hora e detalhes da venda
- Atualização instantânea dos indicadores

### 📋 Tabela de Estoque
- Listagem completa de produtos
- Colunas: Produto, Quantidade, Preço, Vendidos
- **Hover interativo** com animação suave
- Botões de ação: Venda rápida e Exclusão

### 📊 Relatório de Vendas
- Visualização completa do histórico de vendas
- Informações: Produto, Cliente, Data, Hora, Quantidade, Valor, Total, Observação
- Cards de resumo com estatísticas
- Funcionalidade de impressão integrada
- Design responsivo para qualquer tela

### 🔒 Fechamento de Mês
- Salva automaticamente todo o histórico do mês
- Limpa dados para novo período
- Dados permanecem acessíveis no histórico

### 📚 Históricos de Fechamento
- Acesso completo a todos os meses fechados
- Visualização de relatórios de períodos anteriores
- Cards interativos com resumo de cada mês
- Filtro por período

### 👤 Assinatura com Redes Sociais
- Assinatura discreta do desenvolvedor
- Popup interativo ao clicar
- Links diretos para:
  - 🔗 GitHub: https://github.com/dudufassa
  - 💼 LinkedIn: https://linkedin.com/in/devmarcioeduardo
  - 📸 Instagram: @dudu.fsss

## 🎨 Design e UX

- **Interface Moderna**: Design limpo com gradientes e animações fluidas
- **Tema Escuro Elegante**: Fundo com gradiente azul-preto profissional
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Transições e efeitos de hover elegantes
- **Acessibilidade**: Boa contrast e navegação intuitiva

## 💻 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e moderna
- **CSS3**: Estilos avançados com variáveis CSS e animações
- **JavaScript (ES6+)**: Lógica funcional e interatividade
- **localStorage**: Persistência de dados no navegador
- **Git**: Controle de versão

## 🚀 Como Usar

### Instalação Rápida

1. Clone o repositório:
```bash
git clone https://github.com/dudufassa/Controle-Estoque.git
cd Controle-Estoque
```

2. Abra o arquivo `index.html` no navegador:
   - Duplo clique em `index.html`, ou
   - Abra pelo VS Code com "Live Server", ou
   - Use o Chrome Debugger do VS Code (F5)

### Primeiro Uso

1. **Cadastre um Produto**:
   - Preencha: Nome, Quantidade e Preço
   - Clique em "Cadastrar Produto Agora"

2. **Registre uma Venda**:
   - Clique em "＋ Venda" do produto desejado
   - Preencha: Cliente (opcional), Valor, Observação (opcional)
   - Clique em "✓ Confirmar Venda"

3. **Visualize Relatório**:
   - Clique em "📋 Ver Relatório de Vendas"
   - Veja histórico completo com impressão disponível

4. **Feche o Mês**:
   - Clique em "✓ Fechar Mês"
   - Dados são salvos e acessíveis em "📚 Históricos de Fechamento"

## 📁 Estrutura de Arquivos

```
Controle-Estoque/
├── index.html          # Página principal (estrutura HTML)
├── style.css           # Estilos CSS consolidados
├── script.js           # Lógica JavaScript
├── .vscode/
│   └── launch.json     # Configuração do VS Code
└── README.md           # Este arquivo
```

## 🔒 Segurança e Privacidade

- ✅ Todos os dados são armazenados **localmente** no navegador (localStorage)
- ✅ **Nenhum dado é enviado** para servidor externo
- ✅ Dados persistem entre sessões
- ✅ Limpar cache do navegador apaga todos os dados

## 📱 Suporte de Navegadores

- ✅ Chrome/Chromium (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 🎯 Roadmap Futuro

- [ ] Exportação em PDF com logo da empresa
- [ ] Backup automático em nuvem
- [ ] Integração com múltiplas contas
- [ ] Gráficos de vendas com Chart.js
- [ ] Análise de tendências
- [ ] Aplicativo mobile (PWA)

## 👨‍💻 Desenvolvedor

**devmarcioeduardo**
- 🔗 GitHub: [@dudufassa](https://github.com/dudufassa)
- 💼 LinkedIn: [devmarcioeduardo](https://linkedin.com/in/devmarcioeduardo)
- 📸 Instagram: [@dudu.fsss](https://instagram.com/dudu.fsss)

## 📄 Licença

Este projeto é de código aberto e está disponível para uso pessoal e comercial.

## 💡 Dicas de Uso

- **Dados Persistem**: Feche o navegador sem medo, seus dados estarão lá quando voltar
- **Hover nos Elementos**: Passe o mouse sobre cards e produtos para ver animações
- **Imprimir Relatórios**: Use "🖨️ Imprimir Relatório" para gerar documentos
- **Múltiplos Meses**: Feche meses sempre que necessário, o histórico é infinito
- **Valor Customizado**: Na venda, coloque exatamente o valor que o cliente pagou

---

**Desenvolvido com ❤️ para facilitar seu controle de estoque**

*Versão 1.0 - Julho 2026*
