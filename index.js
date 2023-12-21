require("dotenv").config();
const app = require("./api");

app.listen(process.env.LOCAL_PORT, (error) => {
  if (error) {
    console.error('Erreur lors du démarrage du serveur :', error);
    return;  // Ne pas continuer si une erreur survient
  }
  console.log(`Backend en cours d'exécution sur http://localhost:${process.env.LOCAL_PORT}`);
});