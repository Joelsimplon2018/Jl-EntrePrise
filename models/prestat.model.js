const db = require("../config/db");

const table = "prestataire";

const createPrestataire = function createPrestataire(clbk, payload) {
    const q = "INSERT INTO prestataire (nom, prenom, email, password, ville, image, experience, competence, titre, tarif, telephone ) VALUES (?, ?, ?, ?,?,?, ?, ?, ?, ?, ?)";
    const data = [payload.nom, payload.prenom, payload.email, payload.password, payload.ville,payload.image, payload.experience, payload.competence, payload.titre, payload.tarif, payload.telephone];
  
    db.query(q, data, (err, res, cols) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };
  
  const deletePrestataire = function deletePrestataire(clbk, ids) {
    // ci-dessous, la clause SQL IN permet de chercher dans un tableau de valeurs
    const q = "DELETE FROM prestataire WHERE id = ?";
    // alternative => boucler sur ids et query chaque id ....
    db.query(q, [ids], function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };
  
  const editPrestataire = function editPrestataire(clbk, user) {
    const q = "UPDATE prestataire SET nom = ?, prenom = ?, email = ?, password = ?, ville = ?, image = ?, experience = ?, competence = ?, titre = ?, tarif =?, telephone = ? WHERE id = ? ";
    const payload = [prestataire.nom, prestataire.prenom, prestataire.email, prestataire.password,prestataire.ville,prestataire.image,prestataire.experience, prestataire.competence, prestataire.titre, prestataire.tarif, prestataire.telephone];
    db.query(q, payload, function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };
  

async function getPrestataire({id}) {
    
  var sql ;
  if(!id) sql= `SELECT * FROM prestataire`;
  else sql = `SELECT * FROM prestataire WHERE id = ${id}`;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        if(!id){

          let prestataire = results;
          resolve(prestataire);
        } else {
          let prestataire = results[0];
          resolve(prestataire);
        }
      }
    });
  });
}

  module.exports = {
   
    createPrestataire,
    deletePrestataire,
    editPrestataire,
    getPrestataire
    // getPrestaireMissionUser
   

  };