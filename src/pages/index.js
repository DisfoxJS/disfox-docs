import { useState, useEffect } from 'react';
import '../css/home.css';

export default function Home() {
  const phrases = [
    'Organize your Application.',
    'Build with practicality.',
    'Use automation!',
    'Create with security.',
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && displayedText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIndex]);

  return (
    <div className="home-page">
      <div className="glow-line"></div>

      <main className="container-light">
        <div className="main-layout">
          <div className="content-left">
            <section className="hero-section">
              <div className="hero-content">
                <img
                  src="/img/dfx-outline.png"
                  alt="Disfox Logo"
                  className="logo-img-light"
                />

                <h1 className="hero-title">
                  Build applications with real organization and total flexibility.
                </h1>

                <div className="typewriter-light">
                  <span className="tw-prefix">|</span>
                  <span className="tw-text">
                    {displayedText}
                    <span className="tw-cursor"></span>
                  </span>
                </div>

                <nav className="action-buttons">
                  <a
                    href="/docs/disfox/0.1.0/en/Get-Started/install"
                    className="btn btn-primary"
                  >
                    Documentation
                  </a>

                  <a href="/docs/disfox/0.1.0/en/Get-Started/Why%20Disfox" className="btn btn-secondary">
                    Why Disfox?
                  </a>

                  <a href="/changelog" className="btn btn-secondary">
                    Updates
                  </a>

                  <a href="https://disfox.netlify.app/contribuitors" className="btn btn-secondary">
                    Contribuitors
                  </a>

                  <a
                    href="https://npmjs.com/package/disfox"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    NPM Package
                  </a>

                  <a
                    href="https://github.com/DisfoxJS/Disfox"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                  >
                    GitHub
                  </a>
                </nav>
              </div>

              <div className="hero-visual">
                <div className="terminal-light">
                  <div className="terminal-header">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>

                  <div className="terminal-body">
                    <span className="prompt">❯</span>
                    <span className="command">npm install disfox</span>
                  </div>
                </div>
              </div>

              <div class="description">
                <p> <strong>Disfox</strong> is a TypeScript-powered framework for Discord.js designed to make application development faster, cleaner, and smarter. </p> <p> With built-in automation tools, integrated services, and a modern architecture, Disfox eliminates repetitive tasks and helps you focus on creating exceptional Discord applications. </p> <p> Less boilerplate. More productivity. Unlimited possibilities. </p> <a href="https://disfox.js.org/docs/disfox/0.1.0/en/Get-Started/Why%20Disfox/"> Why Disfox? </a>
              </div>
            </section>
          </div>

          

          <aside className="sidebar-right">
            <a href="/changelog" className="ad-card-light">
              <img
                src="/img/v0.1.0.png"
                alt="v0.1.0"
                className="ad-image"
              />
            </a>

            <a href="https://disfox.netlify.app" className="ad-card-light">
              <img
                src="/img/legacy-site.png"
                alt="banner"
                className="ad-image"
              />
            </a>

            <a
              href="https://discord.gg/UuZnAuhhP6"
              className="ad-card-light"
            >
              <img
                src="/img/discord-joinus.png"
                alt="Discord"
                className="ad-image"
              />
            </a>

            <a
              href="https://github.com/DisfoxJS/Disfox"
              className="ad-card-light"
            >
              <img
                src="/img/githubrepository.png"
                alt="GitHub"
                className="ad-image"
              />
            </a>
          </aside>
        </div>

        <section className="built-with">
          <div className="tech-logos">
            <p className="built-title">Powered by</p>

            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                alt="Node.js"
                title="Node.js"
              />
            </a>

            <a
              href="https://discord.js.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://icon.icepanel.io/Technology/svg/Discord.js.svg"
                alt="Discord.js"
                title="Discord.js"
              />
            </a>
          </div>
        </section>
        

        <footer className="footer-light" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
  
  {/* Esquerda: Redes Sociais / Font Awesome Icons */}
  <div className="footer-left" style={{ display: 'flex', gap: '15px' }}>
    <a href="https://discord.gg/UuZnAuhhP6" target="_blank" rel="noreferrer" aria-label="Discord">
      <i className="fa-brands fa-discord"></i>
    </a>
    <a href="https://github.com/DisfoxJS" target="_blank" rel="noreferrer" aria-label="GitHub">
      <i className="fa-brands fa-github"></i>
    </a>
    <a href="https://npmjs.com/package/disfox" target="_blank" rel="noreferrer" aria-label="NPM">
      <i className="fa-brands fa-npm"></i>
    </a>
  </div>

  {/* Meio: Copyright e Licença MIT */}
  <div className="footer-center" style={{ textAlign: 'center' }}>
    <p>© 2026 Disfox. Licensed under the MIT License.</p>
  </div>

  {/* Direita: Links com setinha para cima */}
  <div className="footer-right" style={{ display: 'flex', gap: '20px' }}>
    <a href="https://disfox.js.org/docs/disfox/0.1.0/en/Get-Started/Why%20Disfox" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      Why Disfox <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem' }}></i>
    </a>
    <a href="https://disfox.js.org/docs/disfox/0.1.0/en/Get-Started/install/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      Get Started <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem' }}></i>
    </a>
  </div>

</footer>
      </main>
    </div>
  );
}