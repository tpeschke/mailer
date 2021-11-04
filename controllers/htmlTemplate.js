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
          <style>
     
          .shell {
            max-width: 950px;
            margin: 0 auto;
            border: 5px solid #24261c;
          }
        
          .header {
              height: 250px;
              background-image: url("https://i.imgur.com/LaRwPmv.jpg");
              background-repeat: no-repeat;
              background-size: 100%;
              background-position: 0px -83px;
          }
        
          .logo {
            height: 250px;
            width: 250px;
            background-image: url("https://i.imgur.com/TatOGrh.png");
            background-repeat: no-repeat;
            background-size: 100%;
            float: left;
          }
        
          .body {
            background: whitesmoke;
            border-bottom: 25px solid #24261c;
            border-top: 25px solid #24261c;
            background-image: url("https://i.imgur.com/CugeqP7.jpg");
            background-repeat: no-repeat;
            background-size: 100%;
          }
        
          .icon-shell {
            height: 160px;
            width: 160px;
            margin: 0 auto;
            background: #24261c;
            border-radius: 100%;
            float: right;
          }
        
          .icon {
            height: 140px;
            width: 140px;
            background-image: url("https://i.imgur.com/zN8lGa3.png");
            background-repeat: no-repeat;
            background-size: 100%;
            margin: 0 10px 0 13px;
          }
        
          .content {
              padding: 30px;
          }
        
          .content h1 {
              color: #d1504c;
              font-family: 'Times New Roman', serif;
              font-size: 35px;
              margin-bottom: 5px;
          }
        
          .content h2 {
            color: #24261c;
            font-family: 'Times New Roman', serif;
            font-size: 25px;
            margin: 10px 0 5px;
            border-bottom: 2px solid #24261c;
          }
        
          .content p {
              text-indent: 40px;
              padding-top: 5px;
              margin: 0
          }
        
          .footer {
            height: 50px;
            background-image: url("https://i.imgur.com/EsnbL4m.jpg");
            background-repeat: no-repeat;
            background-size: 100%;
          }
        
          .unsubscribe-shell {
            width: 150px;
            margin: 0 auto;
            padding-top: 12px;
            text-align: center;
          }
        
          .footer a:hover {
            color: whitesmoke
        }
        
        @media (max-width: 1025px) {
        
          .header, .footer {
              background-size: 650px auto; /* Force the image to its minimum width */
          }
        
        }

        @media (max-width: 800px) {
        
            .icon-shell {
                float: unset;
                margin: 0 auto
              }
          
          }
          </style>
        </head>
        
        <body>
          <div class="shell">
            <div class="header">
              <div class="logo"></div>
              </div>
            <div class="body">
              <div class="content">
              <div class="icon-shell">
              <div class="icon"></div>
            </div>`
    },
    getFooter: () => {
        return `</div>

        </div>
        <div class="footer">
          <div class="unsubscribe-shell">
            <a>Unsubscribe</a>
          </div>
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