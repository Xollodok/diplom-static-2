import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="container max-w-md mx-auto py-10">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Регистрация</h1>
          <p className="text-gray-500">Создайте новый аккаунт</p>
        </div>
        <RegisterForm />
        <div className="text-center text-sm">
          Уже есть аккаунт?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
} 