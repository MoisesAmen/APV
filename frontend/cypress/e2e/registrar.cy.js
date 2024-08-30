/// <reference types="cypress" />

describe('Pruebas en el formulario de Registro', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/registrar');
  });

  it('Debe mostrar el formulario de registro correctamente', () => {
    cy.get('h1').should('contain.text', 'Crea tu Cuenta y Administra tus Pacientes');

    cy.get('input[placeholder="Tu Nombre"]').should('exist');
    cy.get('input[placeholder="Email de Registro"]').should('exist');
    cy.get('input[placeholder="Tu Password"]').should('exist');
    cy.get('input[placeholder="Repite tu Password"]').should('exist');
    cy.get('input[type="submit"]').should('exist').and('have.value', 'Crear Cuenta');
  });

  it('Debe mostrar error si hay campos vacíos al enviar el formulario', () => {
    cy.get('input[type="submit"]').click();

    cy.get('.alerta').should('contain.text', 'Hay campos vacios');
  });

  it('Debe mostrar error si los passwords no coinciden', () => {
    cy.get('input[placeholder="Tu Nombre"]').type('Usuario de Prueba');
    cy.get('input[placeholder="Email de Registro"]').type('usuario@ejemplo.com');
    cy.get('input[placeholder="Tu Password"]').type('password123');
    cy.get('input[placeholder="Repite tu Password"]').type('diferentePassword');
    cy.get('input[type="submit"]').click();

    cy.get('.alerta').should('contain.text', 'Los Password no son iguales');
  });

  it('Debe registrar un usuario correctamente si todos los datos son válidos', () => {
    cy.get('input[placeholder="Tu Nombre"]').type('Usuario de Prueba');
    cy.get('input[placeholder="Email de Registro"]').type('usuario@ejemplo.com');
    cy.get('input[placeholder="Tu Password"]').type('password123');
    cy.get('input[placeholder="Repite tu Password"]').type('password123');
    cy.get('input[type="submit"]').click();

    cy.get('.alerta').should('contain.text', 'Creado Correctamente, revisa tu email');
  });
});

  