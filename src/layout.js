const { html } = require('hono/html');
const { getCookie } = require('hono/cookie');

function layout(c, title, body) {
  const { user } = c.get('session') ?? {};
  title = title ? `${title} - 予定調整くん` : '予定調整くん';

  const theme = getCookie(c, 'theme') || 'light';

  const navClass = theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light';

  return html`
    <!doctype html>
    <html data-bs-theme="${theme}">
      <head>
        <title>${title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/stylesheets/bundle.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
        </head>
      <body>
        <nav class="navbar navbar-expand-md ${navClass}" id="main-navbar">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">予定調整くん</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarResponsive" class="collapse navbar-collapse">
              <ul class="navbar-nav ms-auto">
                ${user
                  ? html`
                      <li class="nav-item">
                        <a class="nav-link" href="/logout"
                          >${user.login} をログアウト</a
                        >
                      </li>
                    `
                  : html`
                      <li class="nav-item">
                        <a class="nav-link" href="/login">ログイン</a>
                      </li>
                    `}
              </ul>
              <button class="btn btn-outline-secondary btn-sm" id="bd-theme-switch" type="button">
                Toggle Theme
              </button>
            </div
          </div>
        </nav>
        <div class ="container">${body}</div>
        <script src="/javascripts/bundle.js"></script>
      </body>
    </html>
  `;
}

module.exports = layout;