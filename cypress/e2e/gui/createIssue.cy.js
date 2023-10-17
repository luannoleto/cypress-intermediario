import { faker } from '@faker-js/faker'

const options = {
  env: {
    snapshotOnly: true,
  },
}; //serve apresentar um feedback visual dos métodos de chamada api quando executados via GUI

describe('Create Issue GUI', options, () => {

  const issue = { //objeto contendo uma variável chamada issue que possui title, description e um projeto que possui name e  description
    title_issue: `issue-${faker.datatype.uuid()}`,
    description_issue: faker.random.words(3),
    project: {
      name_project: `project-${faker.datatype.uuid()}`,
      description_project: faker.random.words(5)
    }
  }
  
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createProject(issue.project)
  })

  it('Criar issue com sucesso', () => {
    cy.gui_createIssue(issue)

    cy.get('.issue-details')
      .should('contain', issue.title_issue)
      .and('contain', issue.description_issue)
  })
})
