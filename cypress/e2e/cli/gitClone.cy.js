import { faker } from '@faker-js/faker'

describe('git clone', () => {
  const project = {
    name_project: `project-clone-${faker.datatype.uuid()}`,
    description_project: faker.random.words(5)
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createProject(project)
  })

  it('clonar projeto do git lab com sucesso', () => {
    cy.cli_cloneViaSSH(project)

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name_project}`)
      .and('contain', project.description_project)
  })
})
