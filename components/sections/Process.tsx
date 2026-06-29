import { SITE_CONFIG } from "@/lib/site-config";

export function Process() {
  return (
    <section
      id="proceso"
      className="section section--white"
      aria-labelledby="proceso-title"
    >
      <div className="container">
        <header className="section-header section-header--center">
          <span className="section-label">Proceso simple</span>
          <h2 id="proceso-title" className="section-title">
            Cómo funciona tu consulta
          </h2>
          <p className="section-subtitle">
            En tres pasos simples empezamos a defender tus derechos. Sin
            trámites complicados.
          </p>
        </header>

        <ol className="process-steps" id="process-steps">
          {SITE_CONFIG.processSteps.map((step, i) => (
            <li key={step.title} className="process-step">
              <span className="process-step__number" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
