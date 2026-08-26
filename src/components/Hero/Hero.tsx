import { HeroCube } from './HeroCube'
import { HeroBackground } from './HeroBackground'
import { HeroParticles } from './HeroParticles'
import { Button, ArrowIcon, PlayIcon } from '../Button/Button'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <HeroBackground />
      <HeroParticles />

      <div className="hero__container">
        <div className="hero__visual">
          <HeroCube />
        </div>

        <div className="hero__content">
          <p className="hero__category hero__animate hero__animate--1">
            TECNOLOGIA • INOVAÇÃO • RESULTADOS
          </p>

          <h1 className="hero__title hero__animate hero__animate--2">
            Transformamos ideias em{' '}
            <span className="hero__title-highlight">soluções</span>{' '}
            inteligentes.
          </h1>

          <p className="hero__description hero__animate hero__animate--3">
            Na overLogic, desenvolvemos sistemas, aplicações e experiências digitais
            que transformam ideias em soluções eficientes para negócios.
          </p>

          <div className="hero__actions hero__animate hero__animate--4">
            <Button variant="primary" icon={<ArrowIcon />}>
              Nossos serviços
            </Button>
            <Button variant="secondary" icon={<PlayIcon />} iconPosition="left">
              Saiba mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
