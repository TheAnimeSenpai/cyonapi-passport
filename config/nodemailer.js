module.exports.nodemailer = {

    gmailTransporter : {
        service : 'Gmail',
        proxy : 'http://172.16.10.20:8080',
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
        proxy : 'http://172.16.10.20:8080',
        auth : {
            user: "postmaster@sandboxeb7148d59aad4f5aa2c0561526a20fd9.mailgun.org", 
            pass: "7b128ee2d427c2869352f9834d38163b"
        }
    },

    mailOptions : {
        from : 'executives.cyon.akute@gmail.com'
    }
    
}