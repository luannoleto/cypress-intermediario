// Nesta classe gui_commands deverão conter apenas métodos que façam chamadas na interface de usuário

//Método que recupera os elementos user e password para fazer login
Cypress.Commands.add(
  'login',
  (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {} // realiza o armazenamento de cache da sessão '{ cacheSession: true }'
  ) => {
    const login = () => {
      cy.visit('/users/sign_in');

      cy.get("[data-qa-selector='login_field']").type(user, { delay: 0 });
      cy.get("[data-qa-selector='password_field']").type(
        password,
        { delay: 0 },
        { log: false }
      );
      cy.get("[data-qa-selector='sign_in_button']").click();
    };

    const validate = () => {
      // a função validade vai visitar a home '/', vai pegar  pathname e verificar se ele não
      cy.visit('/'); //  é igual a '/users/sign_in'
      cy.location('pathname', { timeout: 1000 }).should(
        'not.eq',
        '/users/sign_in'
      );
    };

    const options = {
      cacheAcrossSpecs: true,
      validate,
    };

    if (cacheSession) {
      cy.session(user, login, options);
    } else {
      login();
    }
  }
);

//Método que recupera os elementos de perfil para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('.qa-user-avatar').click();
  cy.contains('Sign out').click();
});

//Método que recupera os campos projeto, descrição, marca README e cria projeto
Cypress.Commands.add('gui_createProject', (project) => {
  cy.visit('/projects/new');

  cy.get('#project_name').type(project.name_project, { delay: 0 });
  cy.get('#project_description').type(project.description_project, {
    delay: 0,
  });
  cy.get('.qa-initialize-with-readme-checkbox').check();
  cy.contains('Create project').click();
});

//Método que recupera os campos titulo, descrição e cria uma issue dentro de um projeto
Cypress.Commands.add('gui_createIssue', (issue) => {
  cy.visit(
    `/${Cypress.env('user_name')}/${issue.project.name_project}/issues/new`
  );

  cy.get('.qa-issuable-form-title').type(issue.title_issue, { delay: 0 });
  cy.get('.qa-issuable-form-description').type(issue.description_issue, {
    delay: 0,
  });
  cy.contains('Submit issue').click();
});

//Método que cria uma label (Etiqueta) a partir de um projeto e uma issue já criadas
Cypress.Commands.add('gui_setLabelOnIssue', (label) => {
  cy.get('.qa-edit-link-labels').click();
  cy.contains(label.name_label).click();
  cy.get('body').click();
});

//Método que cria um marco (Milestone) a partir de um projeto e uma issue já criadas
Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title_milestone).click()
});