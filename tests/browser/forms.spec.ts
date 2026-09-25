import { test, expect } from "@playwright/test";

test("both forms submit all fields to the same-origin endpoint", async ({ page, baseURL }) => {
  const submissions: Record<string, unknown>[] = [];
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  // Isolate browser wiring from real notifications; Worker integrations are tested in workerd.
  await page.route("**/api/send-telegram", async route => {
    expect(route.request().url()).toBe(`${baseURL}/api/send-telegram`);
    expect(route.request().method()).toBe("POST");
    submissions.push(route.request().postDataJSON());
    await route.fulfill({ status: 200, json: { success: true } });
  });
  await page.goto("/");
  const cookieAccept = page.getByRole("button", { name: "Принять", exact: true });
  if (await cookieAccept.isVisible()) await cookieAccept.click();
  const contact = page.locator("#contact form");
  await contact.locator('input[type="text"]').fill("Тест контактов");
  await contact.locator('input[type="tel"]').fill("+998000000000");
  await contact.locator('input[type="checkbox"]').check();
  await contact.locator('button[type="submit"]').click();
  await expect.poll(() => submissions.length).toBe(1);
  expect(submissions[0]).toMatchObject({ name: "Тест контактов", phone: "+998000000000" });
  await expect(contact.locator('input[type="text"]')).toHaveValue("");
  await page.locator("#services h3").first().click();
  const booking = page.locator("form").filter({ has: page.locator('input[type="email"]') });
  await booking.locator('input[type="text"]').fill("Тест записи");
  await booking.locator('input[type="tel"]').fill("+998000000001");
  await booking.locator('input[type="email"]').fill("test@example.com");
  await booking.locator("textarea").fill("Комментарий <&>");
  await booking.locator('button[type="submit"]').click();
  await expect.poll(() => submissions.length).toBe(2);
  expect(submissions[1]).toMatchObject({ name: "Тест записи", phone: "+998000000001",
    email: "test@example.com", comment: "Комментарий <&>", service: expect.any(String) });
  await expect(booking).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("a real local Worker validation error preserves the form for retry", async ({ page }) => {
  await page.goto("/");
  const cookieAccept = page.getByRole("button", { name: "Принять", exact: true });
  if (await cookieAccept.isVisible()) await cookieAccept.click();
  const contact = page.locator("#contact form");
  await contact.locator('input[type="text"]').fill(" ");
  await contact.locator('input[type="tel"]').fill("+998000000000");
  await contact.locator('input[type="checkbox"]').check();
  const response = page.waitForResponse(r => r.url().endsWith("/api/send-telegram"));
  await contact.locator('button[type="submit"]').click();
  expect((await response).status()).toBe(400);
  await expect(contact.locator('input[type="tel"]')).toHaveValue("+998000000000");
  await expect(contact.locator('button[type="submit"]')).toBeEnabled();
});
