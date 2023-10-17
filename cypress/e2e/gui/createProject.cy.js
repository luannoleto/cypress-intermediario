import { faker } from '@faker-js/faker';

const options = {
  env: {
    snapshotOnly: true,
  },
}; //serve apresentar um feedback visual dos métodos de chamada api quando executados via GUI

describe('Create Project GUI', options, () => {
  beforeEach(() => {
    cy.api_deleteProjects();
    cy.login();
  });

  it('Criar projeto com sucesso', () => {
    const project = {
      name_project: `project-${faker.datatype.uuid()}`,
      description_project: faker.random.words(5),
    };

    cy.gui_createProject(project);

    cy.url().should(
      'be.equal',
      `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${
        project.name_project
      }`
    );
    cy.contains(project.name_project).should('be.visible');
    cy.contains(project.description_project).should('be.visible');
  });
});
