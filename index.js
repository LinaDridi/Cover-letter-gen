const fs = require('fs/promises')
const jsreport = require('jsreport-core')({
  allowLocalFilesAccess: true
})
jsreport.use(require('jsreport-handlebars')())
jsreport.use(require('jsreport-assets')({
  publicAccessEnabled: true,
  allowedFiles: '**/*.*',
  searchOnDiskIfNotFoundInStore: true
}))
jsreport.use(require('jsreport-chrome-pdf')());
(async () => {
    await jsreport.init()
    const resp = await jsreport.render({
            template: {
                content: (await fs.readFile('cover.handlebars',{encoding :  "utf8"})),
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                "nomEntreprise": "Speaking-agency" ,
                // connue pour 
                "descriptionEntreprise" :" l'éditeur de logiciels spécialisé dans la conception 3D et le développement des solutions pour la gestion du cycle de vie d’un produit",
                "offreDeStage": "Ingénieur Big Data - Normalisation des données non structurées PartSupply"
            }
        })
    fs.writeFile('lettre_de_motivation_Lina_Dridi.pdf',resp.content)
})()
 

