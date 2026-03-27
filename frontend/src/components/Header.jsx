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
          <h1>{"Zinciri K\u0131rma"}</h1>
          <p className="hero-text">
            {"\u00d6ncelikleri tek bak\u0131\u015fta g\u00f6r, h\u0131zl\u0131 karar ver ve listeyi da\u011f\u0131lmadan y\u00f6net."}
          </p>

          <div className="hero-inline-metrics">
            <div className="inline-metric">
              <span>{"Tamamlama oran\u0131"}</span>
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
              <span className="stat-label">{"Toplam G\u00f6rev"}</span>
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
            placeholder={"G\u00f6rev ba\u015fl\u0131\u011f\u0131 i\u00e7inde ara"}
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div className="segmented-control" role="tablist" aria-label={"G\u00f6rev filtreleri"}>
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={statusFilter === option ? "segment is-active" : "segment"}
              onClick={() => onStatusFilterChange(option)}
            >
              {option === "all" ? "T\u00fcm G\u00f6revler" : option === "active" ? "Aktifler" : "Tamamlananlar"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
