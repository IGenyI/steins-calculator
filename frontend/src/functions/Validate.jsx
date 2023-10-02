export function validatePassword(password) {
    // Verifica se a senha tem pelo menos 8 caracteres e contém pelo menos um número
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }
  
  export function validateConfirmPassword(password, confirmPassword) {
    // Verifica se a confirmação da senha é igual à senha
    return password === confirmPassword;
  }
  