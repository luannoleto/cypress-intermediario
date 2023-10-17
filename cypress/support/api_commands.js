// Nesta classe gui_commands deverão conter apenas métodos que façam chamadas api

const accessToken = `Bearer ${Cypress.env("gitlab_access_token")}`;

//Método que cria um projeto no git lab via API
Cypress.Commands.add("api_createProject", (project) => {
  cy.request({
    method: "POST",
    url: `/api/v4/projects/`,
    body: {
      name: project.name_project,
      description: project.description_project,
      initialize_with_readme: true,
    },
    headers: { Authorization: accessToken },
  });
});

//Método que consulta todos os projetos criados no git lab via API
Cypress.Commands.add("api_getAllProjects", () => {
  cy.request({
    method: "GET",
    url: "/api/v4/projects/",
    headers: { Authorization: accessToken },
  });
});

//Método que recupera e consulta todos os projetos e deleta o projeto do git lab por id via API
Cypress.Commands.add("api_deleteProjects", () => {
  cy.api_getAllProjects().then((res) =>
    res.body.forEach((project) =>
      cy.request({
        method: "DELETE",
        url: `/api/v4/projects/${project.id}`,
        headers: { Authorization: accessToken },
      })
    )
  );
});

//Método que cria uma issue no git lab via API
Cypress.Commands.add("api_createIssue", (issue) => {
  cy.api_createProject(issue.project).then((response) => {
    cy.request({
      method: "POST",
      url: `/api/v4/projects/${response.body.id}/issues`,
      body: {
        title: issue.title_issue,
        description: issue.description_issue,
      },
      headers: { Authorization: accessToken },
    });
  });
});

//Método que cria uma label (Etiqueta) vinculada a uma issue e a um projeto no git lab via API
Cypress.Commands.add("api_createLabel", (projectId, label) => {
  cy.request({
    method: "POST",
    url: `/api/v4/projects/${projectId}/labels`,
    body: {
      name: label.name_label,
      color: label.color_label,
    },
    headers: { Authorization: accessToken },
  });
});

//Método que cria um marco (Milestone) vinculada a uma issue e a um projeto no git lab via API
Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones`,
    body: { title: milestone.title_milestone },
    headers: { Authorization: accessToken },
  });
});