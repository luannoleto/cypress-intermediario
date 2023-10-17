import { faker } from '@faker-js/faker';

describe('Create Project API', () => {
  beforeEach(() => cy.api_deleteProjects());

  it('Criar projeto via API no gitlab com sucesso', () => {
    const project = {
      name_project: `project-${faker.datatype.uuid()}`,
      description_project: faker.random.words(5),
    };

    cy.api_createProject(project).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal(project.name_project);
      expect(response.body.description).to.equal(project.description_project);
    });
  });
});
