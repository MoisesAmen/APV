/// <reference types="cypress" />

describe('Pruebas en el componente AdminNav', () => {

    beforeEach(() => {
      // Autenticación previa antes de verificar el AdminNav
      cy.visit('http://localhost:3000/');
      cy.get('input[type="email"]').type('correo1@correo.com');
      cy.get('input[type="password"]').type('canuto');
      cy.get('input[type="submit"]').click();
    });
  
    it('Debe mostrar el AdminNav correctamente', () => {
      // Verificar que los enlaces de navegación en AdminNav están presentes
      cy.get('nav').should('exist');
      cy.get('nav').contains('Perfil').should('exist');
      //cy.get('nav').contains('Cambiar Password').should('exist');
      cy.get('nav').contains('Cerrar Sesión').should('exist');
    });
  
    it('Debe permitir navegar a la sección de Perfil desde AdminNav', () => {
      cy.get('nav').contains('Perfil').click();
      cy.url().should('include', '/admin/perfil');
  
      // Verificar que la página de perfil se muestra correctamente
      cy.get('h2').should('contain.text', 'Editar Perfil');
    });
  
    it('Debe permitir cerrar sesión desde AdminNav', () => {
        // Presionar el botón de "Cerrar Sesión" en el AdminNav
        cy.get('nav').contains('Cerrar Sesión').click();
      
        // Verificar que el usuario fue redirigido a la página de inicio de sesión
        cy.url().should('equal', 'http://localhost:3000/');
        
        // Verificar que la página de inicio de sesión se muestra correctamente
        cy.get('h1').should('contain.text', 'Inicia Sesión y Administra tus Pacientes');
    });
  });
  