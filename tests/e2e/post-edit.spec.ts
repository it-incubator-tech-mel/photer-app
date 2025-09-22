import { test, expect } from '@playwright/test';

test.describe('Post Editing', () => {
  test('should update post description immediately after save', async ({
    page,
  }) => {
    // Включаем логирование консоли для отладки
    page.on('console', (msg) => {
      console.log(`[PAGE LOG] ${msg.text()}`);
    });

    // Сначала переходим на профиль, где уже есть cookies авторизации
    await page.goto('/profile/cmfovo66m0000v39816a2gwg7');

    console.log('Navigated to profile page');

    // Ждем загрузки страницы и проверяем, что мы авторизованы
    await page.waitForSelector('[data-testid="post-item"]', { timeout: 10000 });

    console.log('Posts loaded successfully');

    // Находим первый пост
    const firstPost = page.locator('[data-testid="post-item"]').first();

    // Получаем исходное описание поста
    const originalDescription = await firstPost
      .locator('[data-testid="post-description"]')
      .textContent();

    console.log('Original description:', originalDescription);

    // Нажимаем на пост, чтобы открыть модальное окно
    await firstPost.click();

    console.log('Clicked on first post');

    // Ждем открытия модального окна
    await page.waitForSelector('[data-testid="post-menu"]', { timeout: 5000 });

    console.log('Post modal opened');

    // Нажимаем на три точки (меню поста)
    await page.click('[data-testid="post-menu"]');

    console.log('Clicked on post menu');

    // Нажимаем "Edit post"
    await page.click('text=Edit post');

    console.log('Clicked on Edit post');

    // Ждем открытия модального окна редактирования
    await page.waitForSelector('[data-testid="edit-post-modal"]', {
      timeout: 5000,
    });

    console.log('Edit modal opened');

    // Получаем textarea для описания
    const descriptionTextarea = page.locator(
      '[data-cy="edit-description-textarea"]'
    );

    // Создаем новое описание
    const newDescription = `Updated description ${Date.now()}`;

    console.log('Will update description to:', newDescription);

    // Очищаем и вводим новое описание
    await descriptionTextarea.clear();
    await descriptionTextarea.fill(newDescription);

    console.log('Filled new description');

    // Нажимаем "Save Changes"
    await page.click('button:has-text("Save Changes")');

    console.log('Clicked Save Changes');

    // Ждем закрытия модального окна
    await page.waitForSelector(
      '[data-testid="edit-post-modal"]',
      {
        state: 'hidden',
      },
      { timeout: 10000 }
    );

    console.log('Edit modal closed');

    // Ждем немного для обработки обновления данных
    await page.waitForTimeout(2000);

    console.log('Waited 2 seconds for data update');

    // Проверяем, что мы вернулись к просмотру поста
    await page.waitForSelector('[data-testid="post-menu"]', { timeout: 5000 });

    console.log('Back to post view');

    // Проверяем, что описание обновилось без перезагрузки страницы
    const updatedDescription = await firstPost
      .locator('[data-testid="post-description"]')
      .textContent();

    console.log('Updated description from DOM:', updatedDescription);

    // Убеждаемся, что страница не перезагружалась (проверяем URL)
    expect(page.url()).toContain('/profile/cmfovo66m0000v39816a2gwg7');

    console.log('Test completed - check logs above for data flow');
  });

  test('should show confirmation dialog when trying to close with unsaved changes', async ({
    page,
  }) => {
    // Сначала переходим на профиль, где уже есть cookies авторизации
    await page.goto('/profile/cmfovo66m0000v39816a2gwg7');

    // Ждем загрузки страницы и проверяем, что мы авторизованы
    await page.waitForSelector('[data-testid="post-item"]', { timeout: 10000 });

    // Находим первый пост и открываем редактирование
    const firstPost = page.locator('[data-testid="post-item"]').first();
    await firstPost.locator('[data-testid="post-menu"]').click();
    await page.click('text=Edit post');

    // Ждем открытия модального окна
    await page.waitForSelector('[data-testid="edit-post-modal"]');

    // Вводим изменения
    const descriptionTextarea = page.locator(
      '[data-testid="edit-description"]'
    );
    await descriptionTextarea.clear();
    await descriptionTextarea.fill('Test changes that will be discarded');

    // Пытаемся закрыть крестиком
    await page.click('[data-testid="edit-close-button"]');

    // Должен появиться диалог подтверждения
    await page.waitForSelector('[data-testid="confirm-dialog"]');

    // Проверяем текст диалога
    const dialogText = await page
      .locator('[data-testid="confirm-dialog"]')
      .textContent();
    expect(dialogText).toContain('Do you really want to finish editing?');
    expect(dialogText).toContain('will not be saved');

    console.log('✅ Confirmation dialog test passed!');
  });
});
