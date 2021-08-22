describe('drag and drop ingredients', () => {
  function loadPage() {
    cy.visit('http://localhost:3000');
    cy.get('.burger-ingredient', {
      timeout: 5000
    }).should('be.visible');
  }

  function dragIngredientToConstructor(type, number = null) {
    const elements = cy.get(`.burger-ingredient-${type}`);
    const selectedElement = number ? elements.first() : elements.eq(number);

    selectedElement
      .trigger('dragstart');
    cy.get('.constructor-ingredients')
      .first()
      .trigger('drop');
  }

  it('should drag bun from list and drop to constructor', () => {
    loadPage();
    dragIngredientToConstructor("bun");

    cy.get('.constructor-ingredients .constructor-ingredient')
      .should('have.length', 2);
  });

  it('should drag sauce from list and drop to constructor', () => {
    loadPage();
    dragIngredientToConstructor("sauce");

    cy.get('.constructor-ingredients .constructor-ingredient')
      .should('have.length', 1);
  });
});