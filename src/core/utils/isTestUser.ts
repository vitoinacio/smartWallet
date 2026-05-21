const TEST_USER_EMAIL = 'teste@gmail.com';

export function isTestUser(): boolean {
  const email = sessionStorage.getItem('UserProvider');
  return email === TEST_USER_EMAIL;
}
