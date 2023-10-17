import { faker } from '@faker-js/faker'

describe('Create issue API', () => {
  beforeEach(() => cy.api_deleteProjects())

  it('Criar issue via API no gitlab com sucesso', () => {
    const issue = {
      title_issue: `issue-${faker.datatype.uuid()}`,
      description_issue: faker.random.words(3),
      project: {
        name_project: `project-${faker.datatype.uuid()}`,
        description_project: faker.random.words(5)
      }
    }

    cy.api_createIssue(issue)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.equal(issue.title_issue)
        expect(response.body.description).to.equal(issue.description_issue)
      })
  })
})