import { useEffect, useRef, useState } from 'react';
import { projetos, skills, icones } from './dados.js';

const FRASES = [
  'construir APIs com Python',
  'criar interfaces com JavaScript',
  'transformar ideias em código',
];
const EMAIL = 'jorgeflmrt@gmail.com';
const ZAP = 'https://wa.me/5551995949116';
const MENU = [
  ['#', 'Início'],
  ['#projetos', 'Projetos'],
  ['#habilidades', 'Skills'],
  ['#sobre', 'Sobre'],
  ['#contato', 'Contato'],
];

function useDigitando() {
  const [texto, setTexto] = useState('');
  useEffect(() => {
    let frase = 0, letras = 0, apagando = false, timer;
    const passo = () => {
      const atual = FRASES[frase];
      setTexto(atual.slice(0, letras));
      let espera = apagando ? 35 : 70;
      if (!apagando && letras === atual.length) { apagando = true; espera = 1600; }
      else if (apagando && letras === 0) { apagando = false; frase = (frase + 1) % FRASES.length; espera = 400; }
      else letras += apagando ? -1 : 1;
      timer = setTimeout(passo, espera);
    };
    passo();
    return () => clearTimeout(timer);
  }, []);
  return texto;
}

function Icone({ d }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>;
}

function Card({ p }) {
  const [pos, setPos] = useState({});
  const mover = (e) => {
    const c = e.currentTarget.getBoundingClientRect();
    setPos({ '--mx': `${e.clientX - c.left}px`, '--my': `${e.clientY - c.top}px` });
  };
  return (
    <div className="projetos_filhos" style={pos} onMouseMove={mover}>
      {p.selo && <span className="selo">{p.selo}</span>}
      <p className="titulo_projetos">{p.titulo}</p>
      <p className="sobre_projetos">{p.descricao}</p>
      <p className="tecnologias">{p.tecnologias}</p>
      <div className="acoes">
        {p.links.map((l) => (
          <a key={l.href} className={'botao' + (l.secundario ? ' secundario' : '')}
             href={l.href} target="_blank" rel="noopener noreferrer">{l.texto}</a>
        ))}
      </div>
    </div>
  );
}

function Projetos() {
  const [filtro, setFiltro] = useState('todos');
  const grupos = [
    ['front', 'Web e Front-end'],
    ['back', 'Python e Back-end'],
  ];
  const filtros = [['todos', 'Todos'], ...grupos];
  return (
    <section className="projetos" id="projetos">
      <h3>Projetos</h3>
      <p className="frase_projetos">Alguns dos meus projetos e exercícios</p>
      <div className="filtros" role="group" aria-label="Filtrar projetos">
        {filtros.map(([id, nome]) => (
          <button key={id} type="button" className={'filtro' + (filtro === id ? ' ativo' : '')}
                  aria-pressed={filtro === id} onClick={() => setFiltro(id)}>{nome}</button>
        ))}
      </div>
      {grupos.filter(([id]) => filtro === 'todos' || filtro === id).map(([id, nome]) => (
        <div key={id}>
          <h4 className="subtitulo_projetos">{nome}</h4>
          <div className="container">
            {projetos.filter((p) => p.categoria === id).map((p) => <Card key={p.titulo} p={p} />)}
          </div>
        </div>
      ))}
    </section>
  );
}

function Habilidades() {
  return (
    <section className="habilidades" id="habilidades">
      <h3>Habilidades</h3>
      <p className="frase_projetos">Tecnologias que já usei nos meus projetos</p>
      <div className="skills_grid">
        {skills.map((g) => (
          <div className="skill_grupo" key={g.titulo}>
            <h4 className="skill_titulo">{g.titulo}</h4>
            <ul className="skill_lista">
              {g.itens.map((s) => (
                <li className="skill" key={s.nome}>
                  {s.icone ? (
                    <span className="skill_icone"><img src={s.icone} alt="" width="18" height="18" loading="lazy" /></span>
                  ) : (
                    <span className="skill_icone skill_inicial" aria-hidden="true">{s.inicial}</span>
                  )}
                  {s.nome}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contato() {
  const [copiado, setCopiado] = useState('Copiar e-mail');
  const copiar = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopiado('E-mail copiado!'); }
    catch { setCopiado('Não consegui copiar'); }
    setTimeout(() => setCopiado('Copiar e-mail'), 2000);
  };
  const redes = [
    ['LinkedIn', 'Perfil profissional', 'https://www.linkedin.com/in/jorge-meert/', icones[3]],
    ['GitHub', 'Projetos e código', 'https://github.com/jorgemeert', icones[4]],
    ['Instagram', 'Dia a dia e bastidores', 'https://www.instagram.com/jorge_meert/', icones[5]],
  ];
  return (
    <footer className="rodape" id="contato">
      <div className="rodape_conteudo">
        <div className="contato_topo">
          <div className="contato_texto">
            <span className="eyebrow">Contato</span>
            <h3 className="contato_titulo">Vamos construir algo juntos?</h3>
            <p className="contato_descricao">
              Estou em busca de uma oportunidade de estágio em Desenvolvimento Full-Stack. Se você tem
              uma vaga, uma dúvida ou quer trocar uma ideia sobre projetos, é só chamar.
            </p>
            <span className="status"><span className="status_ponto"></span>Aberto a oportunidades de estágio</span>
          </div>
          <div className="cartao_contato">
            <a className="contato_item" href={`mailto:${EMAIL}`}>
              <span className="contato_icone"><Icone d={icones[0]} /></span>
              <span className="contato_info"><span className="contato_rotulo">E-mail</span><span className="contato_valor">{EMAIL}</span></span>
            </a>
            <a className="contato_item" href={ZAP} target="_blank" rel="noopener noreferrer">
              <span className="contato_icone"><Icone d={icones[1]} /></span>
              <span className="contato_info"><span className="contato_rotulo">WhatsApp</span><span className="contato_valor">(51) 99594-9116</span></span>
            </a>
            <div className="contato_item sem_link">
              <span className="contato_icone"><Icone d={icones[2]} /></span>
              <span className="contato_info"><span className="contato_rotulo">Localização</span><span className="contato_valor">Montenegro - RS</span></span>
            </div>
            <div className="contato_acoes">
              <button className="btn_contato principal" type="button" onClick={copiar}>{copiado}</button>
              <a className="btn_contato secundario" href={ZAP} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
            </div>
          </div>
        </div>
        <span className="eyebrow eyebrow_redes">Redes sociais</span>
        <div className="redes">
          {redes.map(([nome, desc, href, d]) => (
            <a className="rede" key={nome} href={href} target="_blank" rel="noopener noreferrer">
              <span className="rede_icone"><Icone d={d} /></span>
              <span className="rede_nome">{nome}</span>
              <span className="rede_desc">{desc}</span>
              <span className="rede_seta" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <p className="rodape_final">© 2026 Jorge Meert. Feito com React, Node e muito café.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [tema, setTema] = useState(() => {
    try { return localStorage.getItem('tema') === 'claro' ? 'claro' : 'escuro'; } catch { return 'escuro'; }
  });
  const [rolagem, setRolagem] = useState({ pct: 0, topo: false, ativo: '#' });
  const digitado = useDigitando();
  const foto = useRef(null);

  useEffect(() => {
    const raiz = document.documentElement;
    if (tema === 'claro') raiz.setAttribute('data-tema', 'claro');
    else raiz.removeAttribute('data-tema');
    try { localStorage.setItem('tema', tema); } catch {}
  }, [tema]);

  useEffect(() => {
    const ids = ['sobre', 'projetos', 'habilidades', 'contato'];
    const atualizar = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      let ativo = null;
      if (y < 60) ativo = '#';
      else if (total > 0 && y >= total - 5) ativo = '#contato';
      else {
        const linha = y + window.innerHeight * 0.4;
        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= linha) ativo = `#${id}`;
        });
      }
      setRolagem({ pct: total > 0 ? y / total : 0, topo: y > 600, ativo });
    };
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);

  const inclinar = (e) => {
    const c = foto.current.getBoundingClientRect();
    const x = (e.clientX - c.left) / c.width - 0.5;
    const y = (e.clientY - c.top) / c.height - 0.5;
    foto.current.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };

  return (
    <>
      <div className="progresso" style={{ transform: `scaleX(${rolagem.pct})` }} aria-hidden="true" />
      <header>
        <nav>
          <div className="home">
            {MENU.map(([href, nome]) => (
              <a key={href} href={href} className={rolagem.ativo === href ? 'ativo' : ''}>{nome}</a>
            ))}
            <button className="tema_botao" type="button" title="Trocar tema"
                    aria-label={tema === 'claro' ? 'Trocar para tema escuro' : 'Trocar para tema claro'}
                    onClick={() => setTema(tema === 'claro' ? 'escuro' : 'claro')}>
              <svg className="icone_sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l-1.41 1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <svg className="icone_lua" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main>
        <div className="conteudo_principal">
          <section className="apresentacao" id="sobre">
            <h2>Eu sou Jorge Meert</h2>
            <h1>Desenvolvedor Full Stack</h1>
            <p>Estudante de Engenharia de Software | Especializando em Soluções Web Inteligentes</p>
            <p>Transformando ideias em códigos funcionais. Atualmente focado em desenvolvimento web moderno com tecnologias como Python e JavaScript</p>
            <p className="digitando">Eu gosto de <span>{digitado}</span><span className="cursor"></span></p>
            <a className="baixarCv" href="curriculo-jorge.pdf" download>Baixar CV</a>
            <div className="fotos">
              <a href="https://github.com/jorgemeert" target="_blank" rel="noopener noreferrer"><img src="foto_github.png" alt="Logo do GitHub" /></a>
              <a href="https://www.linkedin.com/in/jorge-meert/" target="_blank" rel="noopener noreferrer"><img src="foto_linkedin.png" alt="Logo do LinkedIn" /></a>
            </div>
          </section>
          <img ref={foto} className="foto_minha" src="foto_3x4.png" alt="Foto de Jorge Meert"
               onMouseMove={inclinar} onMouseLeave={() => (foto.current.style.transform = '')} />
        </div>
        <Projetos />
        <Habilidades />
      </main>

      <Contato />

      <button className={'topo' + (rolagem.topo ? ' mostrar' : '')} type="button" aria-label="Voltar ao topo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </>
  );
}
