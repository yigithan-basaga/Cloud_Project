function Header({
  totalCount,
  completedCount,
  activeCount,
  completionRate,
  searchQuery,
  onSearchChange,
  statusFilter,
  filterOptions,
  onStatusFilterChange,
}) {
  return (
    <header className="hero-shell">
      <div className="topbar">
        <div className="brand">
          <div>
            <strong>Han's Premium Task Manager</strong>
          </div>
        </div>
      </div>

      <div className="hero">
        <div className="hero-copy">
          <h1>Zinciri Kırma</h1>
          <p className="hero-text">
            Oncelikleri tek bakista gor, hizli karar ver ve listeyi dagilmadan yonet.
          </p>

          <div className="hero-inline-metrics">
            <div className="inline-metric">
              <span>Tamamlama orani</span>
              <strong>%{completionRate}</strong>
            </div>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-screen">
              <div className="visual-window">
                <div className="visual-window-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="visual-window-content">
                  <div className="visual-value-block">
                    <small>Overview</small>
                    <strong>{totalCount}</strong>
                  </div>
                  <div className="visual-list">
                    <div className="visual-list-row">
                      <span />
                      <span />
                    </div>
                    <div className="visual-list-row">
                      <span />
                      <span />
                    </div>
                    <div className="visual-list-row short">
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="visual-bars">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-label">Toplam Görev</span>
              <strong>{totalCount}</strong>
            </div>
            <div className="stat-box">
              <span className="stat-label">Tamamlanan</span>
              <strong>{completedCount}</strong>
            </div>
            <div className="stat-box">
              <span className="stat-label">Bekleyen</span>
              <strong>{activeCount}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="control-bar">
        <label className="search-field">
          <span>Ara</span>
          <input
            type="search"
            placeholder="Gorev basligi icinde ara"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div className="segmented-control" role="tablist" aria-label="Gorev filtreleri">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={statusFilter === option ? "segment is-active" : "segment"}
              onClick={() => onStatusFilterChange(option)}
            >
              {option === "all" ? "Tum Gorevler" : option === "active" ? "Aktifler" : "Tamamlananlar"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
