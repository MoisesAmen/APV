/// <reference types="cypress" />

describe('Pruebas en la página de Administración de Pacientes', () => {

    beforeEach(() => {
      // Autenticación previa antes de visitar la página de administración
      cy.visit('http://localhost:3000/');
      cy.get('input[type="email"]').type('correo1@correo.com');
      cy.get('input[type="password"]').type('canuto');
      cy.get('input[type="submit"]').click();
    });
  
    it('Debe mostrar el listado de pacientes correctamente', () => {  

        // Verificar si hay pacientes
        cy.get('body').then(($body) => {
          if ($body.find('.paciente').length > 0) {
            cy.get('h2').should('contain.text', 'Listado Pacientes');
            // Si hay pacientes, se deben mostrar en la lista
            cy.get('.paciente').should('have.length.greaterThan', 0);
          } else {
            // Si no hay pacientes, se debe mostrar el mensaje correspondiente
            cy.get('h2').should('contain.text', 'No Hay Pacientes');
            cy.get('p').should('contain.text', 'Comienza agregando pacientes y aparecerán en este lugar');
          }
        });
    });
  
    it('Debe permitir agregar un nuevo paciente', () => {  
      cy.get('input[placeholder="Nombre de la Mascota"]').type('Firulais');
      cy.get('input[placeholder="Nombre del Propietario"]').type('Juan Perez');
      cy.get('input[placeholder="Email del Propietario"]').type('juan@correo.com');
      cy.get('input[type="date"]').type('2024-08-30');
      cy.get('textarea[placeholder="Describe los Síntomas"]').type('Muy cansado');
      cy.get('input[type="submit"]').click();
  
      cy.get('.alerta').should('contain.text', 'Guardado Correctamente');
      cy.get('.paciente').should('contain.text', 'Firulais');
    });
  
    it('Debe permitir eliminar un paciente', () => {

      cy.get('input[placeholder="Nombre de la Mascota"]').type('Firulais');
      cy.get('input[placeholder="Nombre del Propietario"]').type('Juan Perez');
      cy.get('input[placeholder="Email del Propietario"]').type('juan@correo.com');
      cy.get('input[type="date"]').type('2024-08-30');
      cy.get('textarea[placeholder="Describe los Síntomas"]').type('Muy cansado');
      cy.get('input[type="submit"]').click();

      cy.get('.paciente').first().within(() => {
        cy.get('button').contains('Eliminar').click();
      });
  
      //cy.get('.alerta').should('contain.text', 'Eliminado Correctamente');
    });
  });
  