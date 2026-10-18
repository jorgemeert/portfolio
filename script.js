// =====================================================
// Portfólio do Jorge: interatividade
// =====================================================

const raiz = document.documentElement;
const reduzirMovimento = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// ---------- 1. Tema claro / escuro ----------
const botaoTema = document.getElementById('botao-tema');

function aplicarTema(tema) {
  if (tema === 'claro') {
    raiz.setAttribute('data-tema', 'claro');
  } else {
    raiz.removeAttribute('data-tema');
  }

  botaoTema.setAttribute(
    'aria-label',
    tema === 'claro' ? 'Trocar para tema escuro' : 'Trocar para tema claro'
  );
}

// O tema salvo já foi aplicado no <head>; aqui só sincronizamos o botão
aplicarTema(raiz.getAttribute('data-tema') === 'claro' ? 'claro' : 'escuro');

botaoTema.addEventListener('click', () => {
  const novoTema =
    raiz.getAttribute('data-tema') === 'claro' ? 'escuro' : 'claro';

  raiz.classList.add('transicao-tema');
  aplicarTema(novoTema);

  try {
    localStorage.setItem('tema', novoTema);
  } catch (erro) {
    // sem localStorage (modo privado, por exemplo): o tema só não fica salvo
  }

  setTimeout(() => raiz.classList.remove('transicao-tema'), 400);
});

// ---------- 2. Barra de progresso, menu ativo e botão de topo ----------
const progresso = document.getElementById('progresso');
const botaoTopo = document.getElementById('botao-topo');
const linksMenu = document.querySelectorAll('.home a');
const secoes = ['sobre', 'projetos', 'habilidades', 'contato']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function atualizarRolagem() {
  const rolagem = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;

  progresso.style.transform = `scaleX(${total > 0 ? rolagem / total : 0})`;
  botaoTopo.classList.toggle('mostrar', rolagem > 600);

  let atual = null;

  if (rolagem < 60) {
    atual = '#';
  } else if (total > 0 && rolagem >= total - 5) {
    atual = '#contato';
  } else {
    const linha = rolagem + window.innerHeight * 0.4;
    secoes.forEach((secao) => {
      if (secao.offsetTop <= linha) atual = `#${secao.id}`;
    });
  }

  linksMenu.forEach((link) => {
    link.classList.toggle('ativo', link.getAttribute('href') === atual);
  });
}

let aguardandoFrame = false;

window.addEventListener(
  'scroll',
  () => {
    if (aguardandoFrame) return;
    aguardandoFrame = true;
    requestAnimationFrame(() => {
      atualizarRolagem();
      aguardandoFrame = false;
    });
  },
  { passive: true }
);

atualizarRolagem();

botaoTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- 3. Efeito de digitação ----------
const frases = [
  'construir APIs com Python',
  'criar interfaces com JavaScript',
  'transformar ideias em código',
];
const textoDigitado = document.getElementById('digitado');

function digitar() {
  let fraseAtual = 0;
  let letras = 0;
  let apagando = false;

  function passo() {
    const frase = frases[fraseAtual];
    textoDigitado.textContent = frase.slice(0, letras);

    let espera = apagando ? 35 : 70;

    if (!apagando && letras === frase.length) {
      apagando = true;
      espera = 1600;
    } else if (apagando && letras === 0) {
      apagando = false;
      fraseAtual = (fraseAtual + 1) % frases.length;
      espera = 400;
    } else {
      letras += apagando ? -1 : 1;
    }

    setTimeout(passo, espera);
  }

  passo();
}

if (reduzirMovimento) {
  textoDigitado.textContent = frases[0];
} else {
  digitar();
}

// ---------- 4. Foto com inclinação 3D ----------
const foto = document.querySelector('.foto_minha');

if (foto && !reduzirMovimento && window.matchMedia('(hover: hover)').matches) {
  foto.addEventListener('mousemove', (evento) => {
    const caixa = foto.getBoundingClientRect();
    const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
    const y = (evento.clientY - caixa.top) / caixa.height - 0.5;

    foto.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  });

  foto.addEventListener('mouseleave', () => {
    foto.style.transform = '';
  });
}

// ---------- 5. Brilho que segue o mouse nos cards ----------
document.querySelectorAll('.projetos_filhos').forEach((card) => {
  card.addEventListener('mousemove', (evento) => {
    const caixa = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${evento.clientX - caixa.left}px`);
    card.style.setProperty('--my', `${evento.clientY - caixa.top}px`);
  });
});

// ---------- 6. Filtro de projetos ----------
const botoesFiltro = document.querySelectorAll('.filtro');
const itensCategoria = document.querySelectorAll('[data-categoria]');

botoesFiltro.forEach((botao) => {
  botao.addEventListener('click', () => {
    const alvo = botao.dataset.filtro;

    botoesFiltro.forEach((outro) => {
      const ativo = outro === botao;
      outro.classList.toggle('ativo', ativo);
      outro.setAttribute('aria-pressed', String(ativo));
    });

    itensCategoria.forEach((item) => {
      item.hidden = !(alvo === 'todos' || item.dataset.categoria === alvo);
    });
  });
});

// ---------- 7. Aparecer ao rolar ----------
const elementosReveal = document.querySelectorAll(
  '.projetos_filhos, .skill_grupo, .rede, .cartao_contato, .contato_texto, .subtitulo_projetos'
);

if (!reduzirMovimento && 'IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementosReveal.forEach((elemento) => {
    const posicao = Array.from(elemento.parentElement.children).indexOf(
      elemento
    );
    elemento.style.animationDelay = `${(posicao % 3) * 100}ms`;
    elemento.classList.add('revelar');
    observador.observe(elemento);
  });
}

// ---------- 8. Copiar e-mail ----------
const botaoCopiar = document.getElementById('copiar-email');

botaoCopiar.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('jorgeflmrt@gmail.com');
    botaoCopiar.textContent = 'E-mail copiado!';
  } catch (erro) {
    botaoCopiar.textContent = 'Não consegui copiar';
  }

  setTimeout(() => {
    botaoCopiar.textContent = 'Copiar e-mail';
  }, 2000);
});
