/// <reference types="cypress" />

describe('Pruebas en el componente Footer', () => {

    beforeEach(() => {
      // Autenticación previa antes de verificar el Footer
      cy.visit('http://localhost:3000/');
      cy.get('input[type="email"]').type('correo1@correo.com');
      cy.get('input[type="password"]').type('canuto');
      cy.get('input[type="submit"]').click();
    });
  
    it('Debe mostrar el Footer correctamente', () => {
      // Verificar que el Footer contiene el texto correcto
      cy.get('footer').should('exist');
      cy.get('footer p').should('contain.text', 'APV - Administrador de Pacientes de Veterinaria');
    });
  
    it('El Footer debe ser visible en la parte inferior de la página', () => {
      // Verificar que el Footer se encuentra al final de la página
      cy.scrollTo('bottom');
      cy.get('footer').should('be.visible');
    });
  });
  