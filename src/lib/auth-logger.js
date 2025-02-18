import { db } from "./db"

export async function logAuthEvent(event) {
  console.log('Auth Event:', {
    type: event.type,
    userId: event.userId,
    ip: event.ip,
    userAgent: event.userAgent,
    success: event.success,
    error: event.error
  })
} 