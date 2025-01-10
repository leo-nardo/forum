test("Get to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  const parsedVersion = parseFloat(responseBody.dependecies.database.version);
  expect(typeof parsedVersion).toBe("number");
  expect(parsedVersion).toBe(16);

  expect(responseBody.dependecies.database.max_connections).toBe(100);
  expect(responseBody.dependecies.database.opened_connection).toBe(1);
});
