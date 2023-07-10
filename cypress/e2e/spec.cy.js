describe('Testeos en Aplicacion Web', () => {





  it('Inicia sesión exitosamente', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Cannot read properties of null')) {
        return false;
      }
    });

    cy.visit('http://127.0.0.1:8000/accounts/login/?next=/')

    // Ingresa el nombre de usuario
    cy.get('input[name="username"]').type('admin')

    // Ingresa la contraseña
    cy.get('input[name="password"]').type('12345')
    cy.wait(4000)

    // Envía el formulario de inicio de sesión
    cy.get('form').submit()

    // Verifica que el inicio de sesión haya sido exitoso
    cy.url().should('eq', 'http://127.0.0.1:8000/') // Cambia la URL si redirige a otra página después del inicio de sesión exitoso
    cy.contains('Bienvenido')
    cy.wait(4000)
    // Visita la página de creación de nueva cuenta
  })





  it('Agrega Cuenta Correctamente', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Cannot read properties of null')) {
        return false;
      }

    });
    cy.visit('http://127.0.0.1:8000/accounts/login/?next=/')
    cy.get('input[name="username"]').type('admin')

    // Ingresa la contraseña
    cy.get('input[name="password"]').type('12345')

    // Envía el formulario de inicio de sesión
    cy.get('form').submit()
    cy.wait(4000)

    // Verifica que el inicio de sesión haya sido exitoso
    cy.url().should('eq', 'http://127.0.0.1:8000/') // Cambia la URL si redirige a otra página después del inicio de sesión exitoso
    cy.contains('Bienvenido Administrador')
    cy.wait(4000)
    cy.visit('http://127.0.0.1:8000/nueva_cuenta/');

    // Ingresa los datos en el formulario
    cy.get('input[name="username"]').type('usuario');
    cy.get('input[name="password"]').type('contraseña');
    cy.get('select[name="rol"]').select('2'); // Ajusta el valor según el rol que deseas seleccionar
    cy.wait(4000)
    // Envía el formulario de creación de nueva cuenta
    cy.get('#formulario_nueva_cuenta').submit();
    cy.wait(4000)


    // Verifica que se haya creado la cuenta exitosamente
    cy.url().should('eq', 'http://127.0.0.1:8000/listaCuenta/'); // Cambia la URL si redirige a otra página después de crear la cuenta
    cy.wait(4000)
  })




  it('Modificar  Cuenta Correctamente', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Cannot read properties of null')) {
        return false;
      }

    });
    cy.visit('http://127.0.0.1:8000/accounts/login/?next=/')
    cy.get('input[name="username"]').type('admin')

    // Ingresa la contraseña
    cy.get('input[name="password"]').type('12345')

    // Envía el formulario de inicio de sesión
    cy.get('form').submit()

    // Verifica que el inicio de sesión haya sido exitoso
    cy.url().should('eq', 'http://127.0.0.1:8000/') // Cambia la URL si redirige a otra página después del inicio de sesión exitoso
    cy.contains('Bienvenido Administrador')
    // Cambia la URL si redirige a otra página después de crear la cuenta
    cy.visit('http://127.0.0.1:8000/listaCuenta/')
    cy.wait(4000); // Espera 4 segundos para asegurarse de que los datos estén cargados correctamente
    cy.get('tbody tr').eq(3).within(() => { // Utiliza eq(2) para seleccionar la tercera fila (índice 2)
      cy.contains('Modificar').click();
      cy.wait(4000);
    });

    // Verifica que se haya redirigido al formulario de modificación de cuenta
    cy.url().should('eq', 'http://127.0.0.1:8000/cuentas/4/modificar/')
    cy.wait(4000) // Cambia la URL según la cuenta que deseas modificar
    cy.get('input[name="username"]').clear().type('rllenera');
    cy.get('input[name="password"]').clear().type('12345');
    cy.get('select[name="rol"]').select('1'); // Ajusta el valor según el rol que deseas seleccionar
    cy.wait(4000)
    cy.get('#modificar_cuenta').submit();
    cy.wait(4000)

    // Verifica que se haya creado la cuenta exitosamente
    cy.url().should('eq', 'http://127.0.0.1:8000/listaCuenta/'); // Cambia la URL si redirige a otra página después de crear la cuenta
    cy.wait(4000)

  })






  it('Cerrar Sesion Correctamente', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Cannot read properties of null')) {
        return false;
      }

    });
    cy.visit('http://127.0.0.1:8000/accounts/login/?next=/')
    cy.get('input[name="username"]').type('admin')

    // Ingresa la contraseña
    cy.get('input[name="password"]').type('12345')
    cy.wait(4000)

    // Envía el formulario de inicio de sesión
    cy.get('form').submit()


    // Verifica que el inicio de sesión haya sido exitoso
    cy.url().should('eq', 'http://127.0.0.1:8000/') // Cambia la URL si redirige a otra página después del inicio de sesión exitoso
    cy.contains('Bienvenido Administrador')
    cy.wait(4000)
    cy.get('.btn-primary[href="/salir/"]').click({ force: true })

    // Verifica la redirección de la URL
    cy.url().should('eq', 'http://127.0.0.1:8000/accounts/login/?next=/') // Cambia la URL si redirige a otra página después del logout
    cy.contains('Sign in')
    cy.wait(4000)
  })

})
