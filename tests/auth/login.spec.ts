import { test, expect } from '@playwright/test';

test('faz login com credenciais inválidas e verifica mensagem de erro', async ({ page }) => {
  // 1. Abre a página de login
  await page.goto('https://the-internet.herokuapp.com/login');

  // 2. Preenche campos
  await page.getByLabel('Username').fill('usuario_incorreto');
  await page.getByLabel('Password').fill('senha_errada');

  // 3. Clica no botão de login
  await page.getByRole('button', { name: 'Login' }).click();

  // 4. Verifica se a mensagem de erro apareceu
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});


