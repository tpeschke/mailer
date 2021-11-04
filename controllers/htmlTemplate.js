const { urlBase } = require('../server-config')

module.exports = {
    getHeader: () => {
        return `<!doctype html>
        <html lang="en">
        
        <head>
          <meta charset="utf-8">
          <title>Bonfire Mailing List</title>
          <base href="/">
        
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="${urlBase}}/webpage/mailingList.css">
        </head>
        <body>
  <div class="shell">
    <div class="header">
      <div class="logo"></div>
    </div>
    <div class="body">
      <div class="icon-shell">
        <div class="icon"></div>
      </div>

      <div class="content">`
    },
    getFooter: () => {
        return `</div>

        </div>
        <div class="footer">
          <a>Unsubscribe</a>
        </div>
      </div>
      </div>
    </body>
    
    </html>`
    },
    getTestContent: () => {
        return `<h1>- Test Heading -</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam, nibh at maximus hendrerit,
          ipsum felis placerat eros, vitae faucibus leo ligula sit amet nisi. Nullam elementum quam lacinia nisi
          gravida, at fermentum nibh faucibus. Nunc ullamcorper efficitur nibh at consectetur. Proin tempus cursus
          posuere. Curabitur auctor bibendum enim at bibendum. Morbi nec condimentum ex, vitae gravida neque. Cras a ex
          odio.</p>
        <p></p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam, nibh at maximus hendrerit,
          ipsum felis placerat eros, vitae faucibus leo ligula sit amet nisi. Nullam elementum quam lacinia nisi
          gravida, at fermentum nibh faucibus. Nunc ullamcorper efficitur nibh at consectetur. Proin tempus cursus
          posuere. Curabitur auctor bibendum enim at bibendum. Morbi nec condimentum ex, vitae gravida neque. Cras a ex
          odio.</p>
        <h2>Test Heading 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam, nibh at maximus hendrerit,
          ipsum felis placerat eros, vitae faucibus leo ligula sit amet nisi. Nullam elementum quam lacinia nisi
          gravida, at fermentum nibh faucibus. Nunc ullamcorper efficitur nibh at consectetur. Proin tempus cursus
          posuere. Curabitur auctor bibendum enim at bibendum. Morbi nec condimentum ex, vitae gravida neque. Cras a ex
          odio.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam, nibh at maximus hendrerit,
          ipsum felis placerat eros, vitae faucibus leo ligula sit amet nisi. Nullam elementum quam lacinia nisi
          gravida, at fermentum nibh faucibus. Nunc ullamcorper efficitur nibh at consectetur. Proin tempus cursus
          posuere. Curabitur auctor bibendum enim at bibendum. Morbi nec condimentum ex, vitae gravida neque. Cras a ex
          odio.</p>`
    }
}