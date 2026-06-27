import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const planSchema = z.object({
  name: z.string().min(2, 'Nama plan minimal 2 karakter'),
  description: z.string().optional(),
  type: z.enum(['saving', 'installment', 'expense']),
  targetAmount: z.number().min(0, 'Target tidak boleh negatif'),
  dueDate: z.string().optional().nullable(),
  color: z.string().default('mustard'),
})

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense', 'saving_in', 'saving_out', 'installment_payment']),
  amount: z.number().positive('Nominal harus lebih dari 0'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  planId: z.string().optional().nullable(),
  occurredAt: z.string(),
})

export const inviteSchema = z.object({
  email: z.string().email('Email tidak valid'),
  role: z.enum(['editor', 'viewer']),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type PlanInput = z.infer<typeof planSchema>
export type TransactionInput = z.infer<typeof transactionSchema>
export type InviteInput = z.infer<typeof inviteSchema>
