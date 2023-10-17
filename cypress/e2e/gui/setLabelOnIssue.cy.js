import { faker } from '@faker-js/faker'

const options = {
    env: {
      snapshotOnly: true,
    },
  }; //serve apresentar um feedback visual dos métodos de chamada api quando executados via GUI

describe('Setar uma etiqueta (label) na issue', options, () => {
  const issue = {
    title_issue: `issue-${faker.datatype.uuid()}`,
    description_issue: faker.random.words(3),
    project: {
      name_project: `project-${faker.datatype.uuid()}`,
      description_project: faker.random.words(5)
    }
  }

  const label = {
    name_label: `label-${faker.random.word()}`,
    color_label: '#FF1493'
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createLabel(response.body.project_id, label)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name_project}/issues/${response.body.iid}`)
      })
  })

  it('Criar uma etiqueta (label) a uma issue com sucesso', () => {
    cy.gui_setLabelOnIssue(label)

    cy.get('.qa-labels-block').should('contain', label.name_label)
    cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color_label}; color: #FFFFFF;`)
  })
})