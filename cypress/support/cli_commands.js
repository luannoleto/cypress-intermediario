// Nesta classe cli_commands deverão conter apenas métodos que façam chamadas via linha de comando do sistema operacional

//Método que utiliza o cy.exec que possibilita executar comandos no nível do sistema operacional
//cy.exec irá acessar o prompt de comando para executar: cypress/downloads/ depois fará o comando git clone dentro deste diretório
Cypress.Commands.add('cli_cloneViaSSH', project => {
    const domain = Cypress.config('baseUrl').replace('http://', '')
  
    cy.exec(`cd cypress/downloads/ && git clone git@${domain}:${Cypress.env('user_name')}/${project.name_project}.git`)
  })
  