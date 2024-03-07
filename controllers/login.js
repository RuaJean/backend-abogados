const config = require('../database/db');
const sql = require('mssql');
const bcrypt = require('bcryptjs');


 // INICIO DE SESIÓN
 exports.auth = async (req, res) => {
	const adm_correo = req.body.user;
	const adm_password = req.body.pass;  

	authUser(user, pass);
	async function authUser(adm_correo,adm_password){
	  let pool;
	  pool = await sql.connect(config);
	  const request = new sql.Request();
	  const query = `SELECT * FROM administrador WHERE adm_correo = @user`;
	  request.input('user', sql.VarChar, user); 
	  request.input('pass', sql.VarChar, pass);
	  const results = await request.query(query);

	  usuarioEncontrado = results.recordset[0];
	  if (user && pass) {
		if( results.recordset.length === 0 || pass != usuarioEncontrado.password) {    
		  res.send('login', {
						  alert: true,
						  alertTitle: "Error",
						  alertMessage: "USUARIO y/o CONTRASEÑA incorrectos",
						  ruta: 'login'    
					  });			
		}  else {         
				  req.session.loggedin = true;                
				  req.session.name = usuarioEncontrado.name;
				  res.send('login', {
					  alert: true,
					  alertTitle: "Conexión exitosa",
					  alertMessage: "Sucess",
					  alertIcon:'success',
					  ruta: ''
			
				  });        			
			  }
			  res.end();  			
	  }else {	
		res.send('Please enter user and Password!');
		res.end();
	  }
	}
  };

exports.validarSesion =  (req, res)=> {
    //TODO: validar si el usuario está logueado
    //Debemos de crear una cookie desde el frontend que será igual al token de inicio de sesión de express
	if (req.session.loggedin) {
        res.send('loggeado');
		// res.send('index',{
		// 	login: true,
		// 	name: req.session.name			
		// });		
	} else {
        res.send('no loggeado');
		// res.send('index',{
		// 	login:false,
		// 	name:'Debe iniciar sesión',			
		// });				
	}
	res.end();
};