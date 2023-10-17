import { faker } from '@faker-js/faker'

const options = {
    env: {
      snapshotOnly: true,
    },
  }; //serve apresentar um feedback visual dos métodos de chamada api quando executados via GUI

describe('Setar um marco (milestone) na issue', options, () => {
  const issue = {
    title_issue: `issue-${faker.datatype.uuid()}`,
    description_issue: faker.random.words(3),
    project: {
      name_project: `project-${faker.datatype.uuid()}`,
      description_project: faker.random.words(5)
    }
  }

  const milestone = {
    title_milestone: `milestone-${faker.random.word()}`
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createMilestone(response.body.project_id, milestone)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name_project}/issues/${response.body.iid}`)
      })
  })

  it('Criar um marco (milestone) a uma issue com sucesso', () => {
    cy.gui_setMilestoneOnIssue(milestone)

    cy.get('.block.milestone').should('contain', milestone.title_milestone)
  })
})