/// <reference types="cypress" />

describe('Pruebas en la página de Editar Perfil', () => {

    beforeEach(() => {
      // Autenticación previa antes de visitar la página de edición de perfil
      cy.visit('http://localhost:3000/');
      cy.get('input[type="email"]').type('correo1@correo.com');
      cy.get('input[type="password"]').type('canuto');
      cy.get('input[type="submit"]').click();
  
      // Ir a la página de edición de perfil presionando el botón "Perfil"
      cy.get('nav').contains('Perfil').click();
    });
  
    it('Debe mostrar el formulario de editar perfil correctamente', () => {
      cy.get('h2').should('contain.text', 'Editar Perfil');
  
      // Verificar que los campos del formulario están presentes
      cy.get('input[name="nombre"]').should('exist');
      cy.get('input[name="web"]').should('exist');
      cy.get('input[name="telefono"]').should('exist');
      cy.get('input[name="email"]').should('exist');
  
      // Verificar que el botón de guardar cambios esté presente
      cy.get('input[type="submit"]').should('exist').and('have.value', 'Guardar Cambios');
    });
  
    it('Debe mostrar un error si los campos obligatorios están vacíos', () => {
      // Limpiar los campos
      cy.get('input[name="nombre"]').clear();
      cy.get('input[name="email"]').clear();
  
      // Intentar guardar los cambios
      cy.get('input[type="submit"]').click();
  
      // Verificar que se muestra el mensaje de error
      cy.get('.alerta').should('contain.text', 'Email y Nombre son obligatorios');
    });
  
    it('Debe permitir cambiar el nombre y guardar los cambios correctamente', () => {
      // Cambiar el nombre
      cy.get('input[name="nombre"]').clear().type('Nombre Actualizado');
  
      // Guardar los cambios
      cy.get('input[type="submit"]').click();
  
      // Verificar que se muestra el mensaje de éxito
      cy.get('.alerta').should('contain.text', 'Almacenado Correctamente');
  
      // Verificar que el nombre se ha actualizado en el formulario
      cy.get('input[name="nombre"]').should('have.value', 'Nombre Actualizado');
    });
  
    it('Debe permitir cambiar el email y guardar los cambios correctamente', () => {
      // Cambiar el email
      cy.get('input[name="email"]').clear().type('nuevoemail@ejemplo.com');
  
      // Guardar los cambios
      cy.get('input[type="submit"]').click();
  
      // Verificar que se muestra el mensaje de éxito
      cy.get('.alerta').should('contain.text', 'Almacenado Correctamente');
  
      // Verificar que el email se ha actualizado en el formulario
      cy.get('input[name="email"]').should('have.value', 'nuevoemail@ejemplo.com');
    }); 
    
  });
  