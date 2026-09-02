import Cube from './Cube';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      {/* Background circuit lines */}
      <svg className="bg-lines" viewBox="0 0 1717 920" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g stroke="rgba(230,23,44,0.35)" strokeWidth="1" fill="none">
          <polyline points="0,150 90,150 90,320 40,320" />
          <polyline points="1717,180 1600,180 1600,90 1500,90" />
          <polyline points="1717,600 1620,600 1620,760 1717,760" />
          <polyline points="1450,900 1450,780 1560,780 1560,650 1717,650" />
          <polyline points="700,10 700,120 830,120" />
          <polyline points="0,700 120,700 120,850" />
        </g>
        <g fill="#e6172c">
          <circle cx="1590" cy="170" r="3.5" />
          <circle cx="1717" cy="70" r="3.5" />
          <circle cx="1660" cy="480" r="3" />
          <circle cx="775" cy="590" r="3" />
          <circle cx="103" cy="650" r="3" />
          <circle cx="103" cy="450" r="3" />
        </g>
      </svg>

      {/* Navigation */}
      <nav>
        <div className="logo">
          <span className="over">over</span>
          <span className="logic">Logic</span>
        </div>
        <ul className="nav-links">
          <li className="active">Início</li>
          <li>Serviços</li>
          <li>Soluções</li>
          <li>Sobre nós</li>
          <li>Contato</li>
        </ul>
        <div className="cta-nav">Fale conosco ↗</div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <Cube />

        <div className="text-side">
          <div className="eyebrow">TECNOLOGIA &nbsp;•&nbsp; INOVAÇÃO &nbsp;•&nbsp; RESULTADOS</div>
          <h1>
            Transformamos ideias em <span className="accent">soluções</span> inteligentes.
          </h1>
          <p className="desc">
            Na overLogic, desenvolvemos sistemas, aplicações e experiências digitais que impulsionam negócios e geram resultados reais.
          </p>
          <div className="btn-row">
            <button className="btn btn-primary">Nossos serviços ↗</button>
            <button className="btn btn-secondary">
              <span className="play-circle">▶</span> Saiba mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
