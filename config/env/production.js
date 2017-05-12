/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }
    nodemailer : {
      gmailTransporter : {
            service : 'Gmail',
            auth : {
              type : 'OAuth2',
              user : 'executives.cyon.akute@gmail.com',
              clientId: "762273490944-sikbnocpig7rqbsvok7hf66c99dr02ta.apps.googleusercontent.com",
              clientSecret: "nJIMN8BUzYpy59wNvshVGJqz",
              accessToken: "ya29.GltHBAC6s-rjm846o784wRRz5EB9NRSLepihQpbVjVHH3TIHuMqikvdBzD0Fpb5zUnJwLoOqpiLKZ4SacBrz2M42ZwyDekj6USSv-duCHDwXK3YVuRUueLDAn62v",
              refreshToken: "1/DmmUtXHH2f6IA6NpKYv9RJOnDEYr-g5y6Bn_E2Je-co",
              expires: 1484314697598
            }
        },

        mailgunTransporter : {
            service : 'Mailgun',
            auth : {
                user: "postmaster@sandboxeb7148d59aad4f5aa2c0561526a20fd9.mailgun.org", 
                pass: "7b128ee2d427c2869352f9834d38163b"
            }
        },
    },

    utilities : {
        baseUrl : 'http://localhost:1337',
    }

};
