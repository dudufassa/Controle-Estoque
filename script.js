let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
let historico = JSON.parse(localStorage.getItem('historico')) || [];
let historicoMeses = JSON.parse(localStorage.getItem('historicoMeses')) || [];
let indexProdutoVenda = null;

const form = document.getElementById('produto-form');
const tabela = document.getElementById('tabela-produtos');
const cardEstoque = document.getElementById('total-estoque');
const cardVendidos = document.getElementById('total-vendido');
const cardFaturamento = document.getElementById('faturamento-mes');
const btnRelatorio = document.getElementById('btn-relatorio');
const btnHistoricos = document.getElementById('btn-historicos');
const btnFecharMes = document.getElementById('btn-fechar-mes');
const modalVenda = document.getElementById('modal-venda');
const formVenda = document.getElementById('form-venda');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const assinaturaDev = document.getElementById('assinatura-dev');
const modalRedes = document.getElementById('modal-redes');
const btnFecharRedes = document.getElementById('btn-fechar-redes');
const themeToggle = document.getElementById('theme-toggle');

function aplicarTema(theme) {
 document.body.setAttribute('data-theme', theme);
 const icone = themeToggle.querySelector('.theme-toggle__icon');
 const texto = themeToggle.querySelector('.theme-toggle__text');

 if (theme === 'dark') {
  icone.textContent = '☀️';
  texto.textContent = 'Tema claro';
 } else {
  icone.textContent = '🌙';
  texto.textContent = 'Tema escuro';
 }

 localStorage.setItem('theme', theme);
}

const temaSalvo = localStorage.getItem('theme');
const temaInicial = temaSalvo || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
aplicarTema(temaInicial);

themeToggle.addEventListener('click', () => {
 const temaAtual = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
 aplicarTema(temaAtual);
});

function atualizarInterface() {
 tabela.innerHTML = '';
 let totalEstoqueGeral = 0;
 let totalVendidosGeral = 0;
 let faturamentoTotal = 0;
 produtos.forEach((produto, index) => {
 totalEstoqueGeral += produto.qtd;
 totalVendidosGeral += produto.vendidos;
 faturamentoTotal += produto.vendidos * produto.preco;
 const tr = document.createElement('tr');
 tr.innerHTML = `
 <td><strong>${produto.nome}</strong></td>
 <td>${produto.qtd} un</td>
 <td>R$ ${produto.preco.toFixed(2)}</td>
 <td>${produto.vendidos} un</td>
 <td style="text-align: center;">
 <button class="btn-venda" onclick="abrirModalVenda(${index})" ${produto.qtd === 0 ? 'disabled' : ''}>
 ${produto.qtd === 0 ? 'Esgotado' : '＋ Venda'}
 </button>
 <button class="btn-delete" onclick="deletarProduto(${index})">Excluir</button>
 </td>
 `;
 tabela.appendChild(tr);
 });
 cardEstoque.innerText = totalEstoqueGeral;
 cardVendidos.innerText = totalVendidosGeral;
 cardFaturamento.innerText = `R$ ${faturamentoTotal.toFixed(2)}`;
 localStorage.setItem('produtos', JSON.stringify(produtos));
}

function abrirModalVenda(index) {
 indexProdutoVenda = index;
 modalVenda.classList.add('ativo');
 document.getElementById('venda-valor').focus();
}

function fecharModalVenda() {
 modalVenda.classList.remove('ativo');
 formVenda.reset();
 indexProdutoVenda = null;
}

form.addEventListener('submit', (e) => {
 e.preventDefault();
 produtos.push({
 nome: document.getElementById('nome').value,
 qtd: parseInt(document.getElementById('qtd').value),
 preco: parseFloat(document.getElementById('preco').value),
 vendidos: 0
 });
 atualizarInterface();
 form.reset();
});

function venderProduto(cliente, valor, observacao, index) {
 if (produtos[index].qtd > 0) {
 produtos[index].qtd -= 1;
 produtos[index].vendidos += 1;
 
 const agora = new Date();
 historico.push({
 produto: produtos[index].nome,
 preco: valor,
 cliente: cliente || 'Cliente Sem Identificação',
 observacao: observacao || '',
 data: agora.toLocaleDateString('pt-BR'),
 hora: agora.toLocaleTimeString('pt-BR'),
 quantidade: 1
 });
 localStorage.setItem('historico', JSON.stringify(historico));
 
 atualizarInterface();
 }
}

function deletarProduto(index) {
 produtos.splice(index, 1);
 atualizarInterface();
}

formVenda.addEventListener('submit', (e) => {
 e.preventDefault();
 const cliente = document.getElementById('venda-cliente').value;
 const valor = parseFloat(document.getElementById('venda-valor').value);
 const observacao = document.getElementById('venda-observacao').value;
 
 if (indexProdutoVenda !== null && valor > 0) {
 venderProduto(cliente, valor, observacao, indexProdutoVenda);
 fecharModalVenda();
 }
});

btnFecharModal.addEventListener('click', fecharModalVenda);
btnCancelar.addEventListener('click', fecharModalVenda);

modalVenda.addEventListener('click', (e) => {
 if (e.target === modalVenda) {
 fecharModalVenda();
 }
});

function gerarRelatorio() {
 let html = `
 <!DOCTYPE html>
 <html lang="pt-BR">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Relatório de Vendas</title>
 <link rel="stylesheet" href="style.css">
 <style>
 body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f3f4f6; padding: 20px; }
 .container { max-width: 1000px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
 h1 { color: #0070f3; text-align: center; margin-bottom: 30px; }
 .resumo { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
 .card-resumo { background: linear-gradient(135deg, #0070f3 0%, #002b5c 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
 .card-resumo h3 { margin: 0 0 10px 0; font-size: 0.9rem; opacity: 0.9; }
 .card-resumo p { margin: 0; font-size: 1.8rem; font-weight: 700; }
 table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 0.9rem; }
 th { background: #0070f3; color: white; padding: 12px; text-align: left; font-weight: 600; white-space: nowrap; }
 td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
 tbody tr:hover { background: #f9fafb; }
 .total { font-weight: 700; color: #0070f3; }
 .rodape { text-align: center; color: #6b7280; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
 .btn-print { background: #0070f3; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: all 0.3s ease; }
 .btn-print:hover { background: #0051b3; transform: translateY(-2px); box-shadow: 0 8px 15px rgba(0,0,0,0.2); }
 .botoes { text-align: center; margin-bottom: 30px; }
 @media print { body { background: white; padding: 0; } .botoes { display: none; } .btn-print { display: none; } }
 </style>
 </head>
 <body>
 <div class="container">
 <h1>📊 Relatório de Vendas do Mês</h1>
 
 <div class="botoes">
 <button class="btn-print" onclick="window.print()">🖨️ Imprimir Relatório</button>
 </div>
 `;
 
 let totalVendas = 0;
 let totalQuantidade = 0;
 let totalFaturamento = 0;
 
 historico.forEach(venda => {
 totalVendas++;
 totalQuantidade += venda.quantidade;
 totalFaturamento += venda.preco * venda.quantidade;
 });
 
 html += `
 <div class="resumo">
 <div class="card-resumo">
 <h3>Total de Vendas</h3>
 <p>${totalVendas}</p>
 </div>
 <div class="card-resumo">
 <h3>Quantidade Vendida</h3>
 <p>${totalQuantidade} un</p>
 </div>
 <div class="card-resumo">
 <h3>Faturamento Total</h3>
 <p>R$ ${totalFaturamento.toFixed(2)}</p>
 </div>
 </div>
 
 <table>
 <thead>
 <tr>
 <th>Produto</th>
 <th>Cliente</th>
 <th>Data</th>
 <th>Hora</th>
 <th>Quantidade</th>
 <th>Valor</th>
 <th>Total</th>
 <th>Observação</th>
 </tr>
 </thead>
 <tbody>
 `;
 
 historico.forEach(venda => {
 const total = venda.preco * venda.quantidade;
 html += `
 <tr>
 <td><strong>${venda.produto}</strong></td>
 <td>${venda.cliente}</td>
 <td>${venda.data}</td>
 <td>${venda.hora}</td>
 <td>${venda.quantidade} un</td>
 <td>R$ ${venda.preco.toFixed(2)}</td>
 <td class="total">R$ ${total.toFixed(2)}</td>
 <td>${venda.observacao || '-'}</td>
 </tr>
 `;
 });
 
 html += `
 </tbody>
 </table>
 
 <div class="rodape">
 <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
 <p>Gestão de Produtos - Controle de Estoque e Vendas</p>
 </div>
 
 </div>
 </body>
 </html>
 `;
 
 return html;
}

btnRelatorio.addEventListener('click', () => {
 const janela = window.open('', '_blank');
 janela.document.write(gerarRelatorio());
 janela.document.close();
});

function gerarHistoricos() {
 let html = `
 <!DOCTYPE html>
 <html lang="pt-BR">
 <head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Históricos de Fechamento</title>
 <link rel="stylesheet" href="relatorio.css">
 <style>
 .historicos-lista { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
 .card-mes { background: linear-gradient(135deg, #0070f3 0%, #002b5c 100%); color: white; padding: 20px; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; }
 .card-mes:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
 .card-mes h3 { margin: 0 0 10px 0; font-size: 1.2rem; }
 .card-mes p { margin: 5px 0; opacity: 0.9; }
 .card-mes .info { background: rgba(255,255,255,0.1); padding: 10px; border-radius: 4px; margin-top: 10px; }
 .vazio { text-align: center; padding: 40px; color: #6b7280; }
 </style>
 </head>
 <body>
 <div class="container">
 <h1>📚 Históricos de Fechamento de Meses</h1>
 <p style="text-align: center; color: #6b7280;">Clique em um mês para visualizar o relatório detalhado</p>
 `;

 if (historicoMeses.length === 0) {
 html += '<div class="vazio"><p>Nenhum mês fechado ainda.</p></div>';
 } else {
 html += '<div class="historicos-lista">';
 historicoMeses.forEach((mes, index) => {
 html += `
 <div class="card-mes" onclick="visualizarMes(${index})">
 <h3>${mes.mes}</h3>
 <div class="info">
 <p><strong>Total de Vendas:</strong> ${mes.totalVendas}</p>
 <p><strong>Faturamento:</strong> R$ ${mes.totalFaturamento.toFixed(2)}</p>
 </div>
 <p style="font-size: 0.9rem; margin-top: 10px;">Clique para abrir detalhes</p>
 </div>
 `;
 });
 html += '</div>';
 }

 html += `
 </div>
 <script>
 function visualizarMes(index) {
 const dados = ${JSON.stringify(historicoMeses)};
 const mes = dados[index];
 let relatorioHtml = \`
 <!DOCTYPE html>
 <html lang="pt-BR">
 <head>
 <meta charset="UTF-8">
 <title>Relatório - \${mes.mes}</title>
 <link rel="stylesheet" href="relatorio.css">
 </head>
 <body>
 <div class="container">
 <h1>📋 Relatório de Fechamento - \${mes.mes}</h1>
 <div class="botoes">
 <button class="btn-print" onclick="window.print()">🖨️ Imprimir</button>
 </div>
 <div class="resumo">
 <div class="card-resumo">
 <h3>Total de Vendas</h3>
 <p>\${mes.totalVendas}</p>
 </div>
 <div class="card-resumo">
 <h3>Faturamento Total</h3>
 <p>R$ \${mes.totalFaturamento.toFixed(2)}</p>
 </div>
 </div>
 <table>
 <thead>
 <tr>
 <th>Produto</th>
 <th>Cliente</th>
 <th>Data</th>
 <th>Hora</th>
 <th>Quantidade</th>
 <th>Valor</th>
 <th>Total</th>
 <th>Observação</th>
 </tr>
 </thead>
 <tbody>
 \`;
 
 mes.vendas.forEach(venda => {
 const total = venda.preco * venda.quantidade;
 relatorioHtml += \`
 <tr>
 <td><strong>\${venda.produto}</strong></td>
 <td>\${venda.cliente}</td>
 <td>\${venda.data}</td>
 <td>\${venda.hora}</td>
 <td>\${venda.quantidade} un</td>
 <td>R$ \${venda.preco.toFixed(2)}</td>
 <td class="total">R$ \${total.toFixed(2)}</td>
 <td>\${venda.observacao || '-'}</td>
 </tr>
 \`;
 });
 
 relatorioHtml += \`
 </tbody>
 </table>
 <div class="rodape">
 <p>Relatório de fechamento do mês: \${mes.mes}</p>
 </div>
 </div>
 </body>
 </html>
 \`;
 
 const janela = window.open('', '_blank');
 janela.document.write(relatorioHtml);
 janela.document.close();
 }
 </script>
 </body>
 </html>
 `;

 return html;
}

btnHistoricos.addEventListener('click', () => {
 const janela = window.open('', '_blank');
 janela.document.write(gerarHistoricos());
 janela.document.close();
});

btnRelatorio.addEventListener('click', () => {
 const janela = window.open('', '_blank');
 janela.document.write(gerarRelatorio());
 janela.document.close();
});

btnFecharMes.addEventListener('click', () => {
 if (confirm('Tem certeza que deseja fechar o mês?\n\nIsso salvará o histórico de vendas e limpará os dados atuais.')) {
 // Salvar histórico completo do mês
 historicoMeses.push({
 mes: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
 vendas: historico,
 totalVendas: historico.length,
 totalFaturamento: historico.reduce((acc, v) => acc + (v.preco * v.quantidade), 0)
 });
 localStorage.setItem('historicoMeses', JSON.stringify(historicoMeses));
 
 // Limpar dados atuais
 historico = [];
 produtos = [];
 localStorage.setItem('historico', JSON.stringify(historico));
 localStorage.setItem('produtos', JSON.stringify(produtos));
 
 alert('Mês encerrado com sucesso! Os dados foram salvos.');
 atualizarInterface();
 }
});

/*Redes Sociais - Assinatura-----------------------------------------------------*/
function abrirModalRedes() {
 modalRedes.classList.add('ativo');
}

function fecharModalRedes() {
 modalRedes.classList.remove('ativo');
}

assinaturaDev.addEventListener('click', abrirModalRedes);
btnFecharRedes.addEventListener('click', fecharModalRedes);

modalRedes.addEventListener('click', (e) => {
 if (e.target === modalRedes) {
 fecharModalRedes();
 }
});

atualizarInterface();