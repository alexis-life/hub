import sites from './data/sites.json'
import './App.css'

function SiteCard({ site }) {
  const clickable = site.status === 'live' || site.status === 'staging' || site.status === 'in progress'
  const content = (
    <>
      <div className="site-card-top">
        <span className="site-card-name">{site.name}</span>
        <span className={`ax-badge status-${site.status.replace(' ', '-')}`}>
          {site.status}
        </span>
      </div>
      <p className="site-card-desc">{site.description}</p>
    </>
  )

  if (clickable) {
    return (
      <a className="ax-card site-card site-card-clickable" href={site.url}>
        {content}
      </a>
    )
  }

  return (
    <div className="ax-card site-card site-card-muted">
      {content}
    </div>
  )
}

function App() {
  return (
    <>
      <header className="hero">
        <img className="hero-avatar" src="/avatar.png" alt="" />
        <h1 className="hero-name">Alexis Chao</h1>
        <p className="hero-tagline">
          studying cybersecurity · building small archival websites
        </p>
      </header>

      <main className="site-grid">
        {sites.map((site) => (
          <SiteCard key={site.name} site={site} />
        ))}
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a className="footer-link" href="https://github.com/Chikimiko" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="footer-link" href="https://www.linkedin.com/in/alexischao/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p className="ax-meta footer-copy">alexischao.com</p>
      </footer>
    </>
  )
}

export default App
