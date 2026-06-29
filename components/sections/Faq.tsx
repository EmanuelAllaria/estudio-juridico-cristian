import { SITE_CONFIG } from "@/lib/site-config";

export function Faq() {
  return (
    <section
      id="faq"
      className="section section--white"
      aria-labelledby="faq-title"
    >
      <div className="container">
        <header className="section-header section-header--center">
          <span className="section-label">Preguntas frecuentes</span>
          <h2 id="faq-title" className="section-title">
            Resolvemos tus dudas
          </h2>
        </header>

        <div className="faq-list" id="faq-list">
          {SITE_CONFIG.faq.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <div className="faq-item__answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
