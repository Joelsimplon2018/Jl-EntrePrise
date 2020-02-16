const db = require("../config/db");

const createMission = function createMission(clbk, payload) {
    const q = "INSERT INTO mission (titre, description, date, type_prestation,users_idusers, prestataire_id ) VALUES (?, ?, ?, ?, ?, ?)";
    const data = [payload.titre, payload.description, payload.date, payload.type_prestation, payload.users_idusers, payload.prestataire_id];
  
    db.query(q, data, (err, res, cols) => {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };
  
  const deleteMission = function deleteMission(clbk, ids) {
    // ci-dessous, la clause SQL IN permet de chercher dans un tableau de valeurs
    const q = "DELETE FROM mission WHERE id IN (?)";
    // alternative => boucler sur ids et query chaque id ....
    db.query(q, [ids], function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };
  
  const editMission = function editMission(clbk, user) {
    const q = "UPDATE mission SET titre = ?, description = ?, date = ?, type_prestation = ?, users_idusers = ?, prestataire_id = ?   WHERE id = ? ";
    const payload = [mission.titre, mission.description, mission.date, mission.type_prestation, mission.users_idusers, mission.prestataire_id];
    db.query(q, payload, function (err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };
  
  

  async function getMission({id}) {
    
    var sql ;
    if(!id) sql= `SELECT * FROM mission`;
    else sql = `SELECT * FROM mission WHERE id = ${id}`;
  
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          if(!id){
  
            let mission = results;
            resolve(mission);
          } else {
            let mission = results[0];
            resolve(mission);
          }
        }
      });
    });
  }
  
  module.exports = {
    createMission,
    deleteMission,
    editMission,
    getMission,
    

  };
  