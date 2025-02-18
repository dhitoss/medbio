import { authenticator } from 'otplib'

export function generateTwoFactorSecret() {
  return authenticator.generateSecret()
}

export function verifyTwoFactorToken(secret, token) {
  return authenticator.verify({ token, secret })
} 