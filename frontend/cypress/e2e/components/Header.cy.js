/// <reference types="cypress" />

describe('Pruebas en el componente Header', () => {

    beforeEach(() => {
      // Autenticación previa antes de verificar el Header
      cy.visit('http://localhost:3000/');
      cy.get('input[type="email"]').type('correo1@correo.com');
      cy.get('input[type="password"]').type('canuto');
      cy.get('input[type="submit"]').click();
    });
  
    it('Debe mostrar el Header correctamente', () => {
      // Verificar que el Header contiene el título correcto
      cy.get('header').should('exist');
      cy.get('header h1').should('contain.text', 'Administrador de Pacientes de Veterinaria');
    });
  
    it('Debe permitir navegar a la sección de Pacientes desde el Header', () => {
      cy.get('header').contains('Pacientes').click();
      cy.url().should('include', '/admin');
    });
  
    it('Debe permitir cerrar sesión desde el Header', () => {
      cy.get('header').contains('Cerrar Sesión').click();
  
      // Verificar que el usuario fue redirigido a la página de login
      cy.url().should('equal', 'http://localhost:3000/');
      cy.get('h1').should('contain.text', 'Inicia Sesión y Administra tus Pacientes');
    });
  });
  