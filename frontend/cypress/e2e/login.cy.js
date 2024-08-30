/// <reference types="cypress" />

describe('Pruebas en el formulario de Login', () => {

    beforeEach(() => {
      // Suponiendo que la URL base de tu aplicación es 'http://localhost:3000'
      cy.visit('http://localhost:3000/');
    });
  
    it('Debe mostrar el formulario de login correctamente', () => {
      // Verificar que el título de la página se muestra
      cy.get('h1').should('contain.text', 'Inicia Sesión y Administra tus Pacientes');
  
      // Verificar que los campos de email y password estén presentes
      cy.get('input[type="email"]').should('exist');
      cy.get('input[type="password"]').should('exist');
  
      // Verificar que el botón de enviar esté presente
      cy.get('input[type="submit"]').should('exist').and('have.value', 'Iniciar Sesión');
    });
  
    it('Debe mostrar error si los campos están vacíos al enviar el formulario', () => {
      // Click en el botón de enviar sin llenar los campos
      cy.get('input[type="submit"]').click();
  
      // Verificar que se muestra el mensaje de error
      cy.get('.alerta').should('contain.text', 'Todos los campos son obligatorios');
    });
  
    it('Debe permitir llenar los campos de email y password', () => {
      // Llenar los campos
      cy.get('input[type="email"]').type('usuario@ejemplo.com');
      cy.get('input[type="password"]').type('password123');
  
      // Verificar que los valores fueron ingresados correctamente
      cy.get('input[type="email"]').should('have.value', 'usuario@ejemplo.com');
      cy.get('input[type="password"]').should('have.value', 'password123');
    });
  
    it('Debe mostrar error con credenciales incorrectas', () => {
      // Llenar los campos con credenciales incorrectas
      cy.get('input[type="email"]').type('incorrecto@ejemplo.com');
      cy.get('input[type="password"]').type('passwordincorrecto');
      cy.get('input[type="submit"]').click();
  
      // Verificar que se muestra el mensaje de error
      cy.get('.alerta').should('contain.text', 'El Usuario no existe');
    });
  
    it('Debe redirigir al dashboard con credenciales correctas', () => {
      // Llenar los campos con credenciales correctas
      cy.get('input[type="email"]').type('correo1@correo.com');
      cy.get('input[type="password"]').type('canuto');
      cy.get('input[type="submit"]').click();
  
      // Verificar que redirige al dashboard (ruta protegida)
      cy.url().should('include', '/admin');
    });
  });
  