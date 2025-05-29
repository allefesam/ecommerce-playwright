import { test, expect } from '@playwright/test';

test('fluxo completo de carrinho no SauceDemo', async ({ page }) => {
  // Acessa a página inicial
  await page.goto('https://www.saucedemo.com');

  // Login com usuário padrão
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Adiciona dois produtos ao carrinho
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.getByRole('button', { name: 'Add to cart' }).nth(1).click();

  // Vai até o carrinho
  await page.getByRole('link', { name: '2' }).click(); // ícone do carrinho com número de itens

  // Verifica se os dois produtos estão lá
  const itensNoCarrinho = await page.locator('.cart_item').count();
  expect(itensNoCarrinho).toBe(2);

  // Remove um item
  await page.getByRole('button', { name: 'Remove' }).first().click();

  // Verifica que restou 1 item
  expect(await page.locator('.cart_item').count()).toBe(1);

  // Volta para as compras
  await page.getByRole('link', { name: 'Continue Shopping' }).click();

  // Adiciona outro item
  await page.getByRole('button', { name: 'Add to cart' }).nth(2).click();

  // Vai ao carrinho de novo
  await page.getByRole('link', { name: /[12]/ }).click(); // atualiza badge para 2

  // Confirma se tem 2 itens no carrinho
  expect(await page.locator('.cart_item').count()).toBe(2);
});
